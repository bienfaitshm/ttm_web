import React from 'react';
import { Formik } from "formik";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Passenger} from '../../@types/personnal';
import moment from "moment";
import DateInput from '../../../../packages/ui/components/inputs/DateInput';
import Button from '@material-ui/core/Button';
import { JourneyInterface } from '../../../../utils/@types/transport';
import { apis, PASSENGER_URL } from '../../config';

export interface PassengerInputProps{
    journey ?: JourneyInterface;
    type  : "adult"| "child" | "baby";
    value ?: Passenger;
    onValide?: (e:Passenger)=>void
}

const PassengerInput : React.FC<PassengerInputProps> = (props) => {
    const initialValues :Passenger = React.useMemo(()=>({
        birthDay : moment().format('YYYY-MM-DD'),
        firstname :"",
        middlename:"",
        lastname:"",
        gender:"H",
        ...props.value,
    }),[props.value])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit = {(value)=>{
                const newValue = {...value, typeUser: props.type, journey:props.journey?.id };
                apis.post(PASSENGER_URL,newValue )
                    .then(res=>{
                        console.log(res)
                    })
                    .catch(err =>{

                    })
            }}
        >{({values, handleChange, setFieldValue, handleSubmit})=>(
            <React.Fragment>
                <Grid container spacing={1} style={{marginTop:10}}>
                    <Grid item xs={4}>
                        <TextField
                            variant ="outlined"
                            size ="small"
                            name = "firstname"
                            label = "Noms"
                            value = {values.firstname}
                            onChange ={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant ="outlined"
                            size ="small"
                            name = "middlename"
                            label = "Postnom"
                            value = {values.middlename}
                            onChange ={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant ="outlined"
                            size ="small"
                            name = "lastname"
                            label = "Prenom"
                            value = {values.lastname}
                            onChange ={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end" justify="center">
                    <Grid item xs={5}>
                        <DateInput
                            style={{marginTop:10}}
                            label="Date de naissance" 
                            onChange={d=>setFieldValue("birthDay",d)}
                        />
                    </Grid>            
                    <Grid item xs={4}>
                        <TextField
                            style={{marginBottom:8}}
                            select
                            // variant ="outlined"
                            size ="small"
                            name = "gender"
                            label = "Sexe"
                            value = {values.gender}
                            onChange ={handleChange}
                        >
                            <MenuItem value="F">Femme</MenuItem>
                            <MenuItem value="H">Homme</MenuItem>
                            <MenuItem value="I">INDERTERMINE</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            disableElevation
                            size="small"
                            variant ="outlined"
                            onClick = {()=>handleSubmit(undefined)}
                        >Enregistrer les infos</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )}</Formik> 
    )
}

export default PassengerInput;
