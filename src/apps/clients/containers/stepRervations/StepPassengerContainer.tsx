import React from 'react'
import { Container, Typography,Grid, Paper} from '@material-ui/core'
import PassengerInput from '../../components/Personnal/PassengerInput'
import { useSteperAction } from '../../providers/services/steperReservation'
import ButtonNextPrevious from '../../components/ButtonNextPrevious'
import { getSteps } from '../StepContainer'

const StepPassengerContainer = () => {
    const { passengers, journeySelected, currentStep, goNext, goPrivious }  = useSteperAction();
    const AdultList = Array.from(Array(passengers?.adult).keys());
    const BabyList = Array.from(Array(passengers?.baby).keys());
    const ChildList = Array.from(Array(passengers?.child).keys())
    return (
        <div>
            <Container maxWidth="md">
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Adultes ({passengers?.adult})</Typography>
                    <Grid container spacing={1}>
                        {
                            AdultList.map(item=>(
                                <Grid item key={item} style={{marginTop:0}}>
                                    <Paper 
                                        variant="outlined"
                                        style={{padding:15}}
                                    >
                                        <Typography>Adult ({item + 1})</Typography>
                                        <PassengerInput 
                                            type="adult"
                                            journey = {journeySelected}
                                        />
                                    </Paper>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                </div>
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Enfant ({passengers?.child})</Typography>
                    <Grid container spacing={1}>
                        {
                            ChildList.map(item=>(
                                <Grid item key={item} style={{marginTop:20}}>
                                    <Paper
                                        variant="outlined"
                                        style={{padding:15}}
                                    >
                                        <Typography>Enfant ({item + 1})</Typography>
                                        <PassengerInput 
                                            type="child"
                                            journey = {journeySelected}
                                        />
                                    </Paper>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                </div>
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Bebe ({passengers?.baby})</Typography>
                    <Grid container spacing={1}>
                        {
                            BabyList.map(item=>(
                                <Grid item key={item} style={{marginTop:20}}>
                                    <Paper
                                        variant="outlined"
                                        style={{padding:15}}
                                    >
                                        <Typography>Bebe ({item + 1})</Typography>
                                        <PassengerInput 
                                            type="baby"
                                            journey = {journeySelected}
                                        />
                                    </Paper>        
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                </div>
                <ButtonNextPrevious
                    stepLenght ={getSteps().length}
                    currentStep={currentStep}
                    goNext ={goNext}
                    goPrivious ={goPrivious}
                />
            </Container>
        </div>
    )
}

export default StepPassengerContainer
