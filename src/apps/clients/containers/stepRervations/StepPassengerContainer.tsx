import React from 'react'
import { Container, Typography,Grid, Paper} from '@material-ui/core'
import PassengerInput from '../../components/Personnal/PassengerInput'
import { useSteperAction } from '../../providers/services/steperReservation'
import ButtonNextPrevious from '../../components/ButtonNextPrevious'
import { getSteps } from '../StepContainer'
import { FormikProps } from 'formik'
import { Passenger } from '../../@types/personnal'

const StepPassengerContainer = React.forwardRef<HTMLDivElement,any>((props, ref) => {
    const { passengers, journeySelected, currentStep, goNext, goPrivious }  = useSteperAction();
    const AdultList = Array.from(Array(passengers?.adult).keys()).map((item, index)=>{
        const ref = React.createRef<FormikProps<Passenger>>();
        return {
            ref,
            index: index + 1
        }
    })

    
    const BabyList = Array.from(Array(passengers?.baby).keys());
    const ChildList = Array.from(Array(passengers?.child).keys());

    const handlerSubmit = React.useCallback(()=>{
        const adultRefs = AdultList.map(item=>item.ref.current);
        adultRefs.map(item=>item?.handleSubmit())
        console.log(adultRefs)
    },[AdultList]);

    return (
        <div>
            <Container maxWidth="md">
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Adultes ({passengers?.adult})</Typography>
                    <Grid container spacing={1}>
                        {
                            AdultList.map(item=>(
                                <Grid item key={item.index} style={{marginTop:0}}>
                                    <Paper 
                                        variant="outlined"
                                        style={{padding:15}}
                                    >
                                        <Typography>Adult ({item.index})</Typography>
                                        <PassengerInput 
                                            type="adult"
                                            ref = { item.ref}
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
                    goNext ={handlerSubmit}
                    goPrivious ={goPrivious}
                />
            </Container>
        </div>
    )
})

export default StepPassengerContainer
