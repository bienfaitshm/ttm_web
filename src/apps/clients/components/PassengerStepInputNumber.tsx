import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useStateInputNumberPassager } from './inputPassenger';
import Grid  from '@material-ui/core/Grid';
import IconButton  from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Badge from '@material-ui/core/Badge';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ButtonNextPrevious from './ButtonNextPrevious';
import { useSetPassenger, useSteperAction } from '../providers/services/steperReservation';
import { getSteps } from '../containers/StepContainer';

export interface PassengerStepInputNumberProps{

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width:"100%",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "space-around",
        justifyContent: "center",
    },
    paddingPaper:{
        padding:theme.spacing(3),
        margin: theme.spacing(2)
    }
  }),
);

const PassengerStepInputNumber:React.FC<PassengerStepInputNumberProps> = (props) => {
    const classes = useStyles();
    const { goNext, goPrivious, currentStep } = useSteperAction();
    const setPassenger = useSetPassenger();
    const [state, dispath] = useStateInputNumberPassager({adult:1, baby:0,child :0})
    
    const handlerIncrement = React.useCallback((name:string)=>{
        dispath({type: 'increment['+name+']'})
    },[dispath])
    
    const handlerDecrement = React.useCallback((name:string)=>{
        dispath({type: 'decrement['+name+']'})
    },[dispath])

    return (
        <div>
            <div className={classes.root}>
                <div>
                    <Grid
                        container 
                        spacing={3} 
                        alignItems="center"
                        justify ="space-evenly"
                    >
                        <Grid item xs={9}>
                            <Typography variant="body1">
                                Nombre des passagers
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Badge 
                                color="primary"
                                badgeContent={state.adult+state.baby+state.child}>
                                <PeopleAltIcon fontSize="large" />
                            </Badge>
                        </Grid>
                    </Grid>
                    <Paper variant="outlined" className={classes.paddingPaper}>
                        <Grid 
                            container 
                            spacing={3} 
                            alignItems="center"
                            justify ="space-between"
                        >
                            <Grid item xs={4}>
                                <IconButton                         
                                    onClick={()=>handlerDecrement("adult")}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                            <Grid>
                                <Typography>{state.adult} { plurals(state.adult,"Adulte")}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={()=>handlerIncrement("adult")}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper variant="outlined" className={classes.paddingPaper}>
                        <Grid container 
                            spacing={3} 
                            alignItems="center"
                            justify ="space-between"
                        >
                            <Grid item xs={4}>
                                <IconButton                         
                                    onClick={()=>handlerDecrement("child")}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                            <Grid>
                                <Typography>{state.child} { plurals(state.child,"Enfant")}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={()=>handlerIncrement("child")}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper variant="outlined" className={classes.paddingPaper}>
                        <Grid 
                            container 
                            spacing={3}
                            alignItems="center"
                            justify ="space-between"
                        >
                            <Grid item xs={4}>
                                <IconButton                         
                                    onClick={()=>handlerDecrement("baby")}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                            <Grid>
                                <Typography>{state.baby} { plurals(state.baby,"Bebe")}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={()=>handlerIncrement("baby")}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>
            <div>
                <ButtonNextPrevious
                    currentStep={currentStep}
                    stepLenght = {getSteps().length}
                    goNext = {()=>{
                        setPassenger(state);
                        goNext();
                    }}
                    goPrivious ={goPrivious}
                />
            </div>
        </div>
    )
}

export default PassengerStepInputNumber;

function plurals(value:number, single?:string){
    return value === 1 ? single : single+"s"
}