import React, { useMemo } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Querystr from "query-string";
import Button from '@material-ui/core/Button'
import moment from 'moment';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import InputPassenger, { INITIAL_STATE as InitialNumberPassenger } from './inputPassenger';
import InputCity from './inputCity';
import DateInput from '../../../packages/ui/components/inputs/DateInput';
import { Reservations } from '../@types/reserve';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding : theme.spacing(2)
    },
    title:{
        fontWeight :"bold",
    }
  }),
);


export interface SearchVoyageProps{

}

const SearchVoyage:React.FC<SearchVoyageProps> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const initialValues: Reservations = useMemo(()=>(
        { 
            dateDeparture :moment().format('YYYY-MM-DD'),
            dateReturn :moment().format('YYYY-MM-DD'),
            onlyDirect :true,
            passengers : InitialNumberPassenger,
            whereFrom:"",
            whreTo :""
        }
    ),[]);

    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="subtitle1" color="initial">Voyage</Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    history.push(Querystr.stringifyUrl({
                        url:"/search",
                        query:{
                            dateDeparture :values.dateDeparture,
                            dateReturn :values.dateReturn,
                            onlyDirect :values.onlyDirect,
                            whereFrom:values.whereFrom,
                            whreTo :values.whreTo,
                            ...values.passengers,
                        }
                    }))
                   
                }}
            >{({
                values,
                handleChange,
                setFieldValue,
                handleSubmit,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputCity 
                                label="Ville de depart" 
                                name="whereFrom" 
                                onChange={(_,e)=>{
                                    setFieldValue("whereFrom",e.town)
                                }} 
                                // options={options}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputCity 
                                label="Ville d'arriver" 
                                name="whreTo" onChange={(_,e)=>setFieldValue("whreTo",e.town)} 
                                // options={options} 
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        {/* date input */}
                        <Grid item xs={6}>
                            <DateInput
                                maxDate = {moment(values.dateDeparture).format('YYYY-MM-DD')}
                                label="Date de depart" 
                                onChange={d=>setFieldValue("dateDeparture",d)}
                                helperText = "commencer par la date d'arriver"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DateInput
                                minDate = {moment(values.dateReturn).format('YYYY-MM-DD') }
                                label="Date d'arriver" 
                                onChange={d=>setFieldValue("dateReturn",d)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        {/* Passanger */}
                        <Grid item xs={6}>
                            <InputPassenger value={values.passengers} onChange={e=>setFieldValue("passengers",e)}/>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.onlyDirect}
                                        onChange={handleChange}
                                        name="onlyDirect"
                                        color="primary"
                                    />
                                }
                                label="Aller simple"
                            />
                        </Grid>
                    </Grid>
                    <div style={{marginTop:20,}}>
                        <Button type="submit" variant="contained" color="primary" disableElevation>
                            Search
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
        </Paper>
    )
}

export default SearchVoyage;