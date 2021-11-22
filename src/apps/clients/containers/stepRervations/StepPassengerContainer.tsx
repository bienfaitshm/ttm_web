import * as React from 'react'
import { Container, Typography,Grid, Paper} from '@material-ui/core'
import { FormikProps } from 'formik'
import { useSteperAction } from '../../providers/services/steperReservation'
import ButtonNextPrevious from '../../components/ButtonNextPrevious';
import PassengerInput from '../../components/Personnal/PassengerInput'
import { Passenger } from '../../@types/personnal'
import { usePassengerInfoStepMutation } from '../../../../utils/apis/graphql/mutation';
import { StepReservationContext } from "./context-reservations";

const createRefPassenger = (index:number)=>{
    const ref = React.createRef<FormikProps<Passenger>>();
    return {
        ref,
        index: index + 1
    }
}

export interface StepPassengerContainerProps{
   
}
const StepPassengerContainer = React.forwardRef<any,StepPassengerContainerProps>((props, ref) => {
    const {session, adult, child, baby, setStep} = React.useContext(StepReservationContext);

    const { currentStep, goPrivious }  = useSteperAction();
    const [handlerSubumitMut] = usePassengerInfoStepMutation()

    const AdultList = React.useMemo(()=>{
        return Array.from(Array(adult).keys()).map((item, index)=>createRefPassenger(index))
    },[adult]);

    
    const BabyList = React.useMemo(()=>{
        return Array.from(Array(baby).keys()).map((item, index)=>createRefPassenger(index))
    },[baby]);

    const ChildList = React.useMemo(()=>{
        return Array.from(Array(child).keys()).map((item, index)=>createRefPassenger(index))
    },[child]);

    // on valide user passenger end prevent error (empty value)
    const onValideUserPassenger = React.useCallback((e: (FormikProps<Passenger> | null)[])=>{
        let values:any[]= []
        for (let index = 0; index < e.length; index++) {
            const element = e[index];
            if(!element) return;
            if(!element.isValid) return;
            const { key, typeUser ,...restOfValues } = element.values
            values.push({...restOfValues, typeUser: typeUser.toUpperCase()});
        }
        console.log("values", values)
        handlerSubumitMut({
            variables:{
                session,
                passengers: values
            }
        }).then(res=>{
            const {journeySelected, errors } = res.data.reserveInfoPassengers 
            console.log(journeySelected, !errors)
            if(setStep){
                setStep({
                    type:"set_seating",
                    payload: {
                        lastStep : journeySelected.lastStep,
                        journeySeats: journeySelected.journey.journeySeats.edges?.map((selected:any)=>selected.node),
                        passengers : journeySelected.passengers.edges?.map((user:any)=>user.node),
                        cars : journeySelected.journey.cars
                    }
                })
            } 
        }).catch(error=>{
            console.log(error.networkError?.result)
            console.log(JSON.stringify(error))
        })
    },[handlerSubumitMut, session, setStep]);


    const handlerSubmit = React.useCallback(()=>{
        const allRefs = AdultList
            .map(item=>item.ref.current)
            .concat(ChildList.map(item=>item.ref.current))
            .concat(BabyList.map(item=>item.ref.current))        
        allRefs.map(item=>item?.handleSubmit());
        onValideUserPassenger(allRefs)
    },[AdultList, BabyList, ChildList, onValideUserPassenger]);

    return (
        <div>
            <Container maxWidth="md">
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Adultes ({adult})</Typography>
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
                                            keyId = {"adult"+item.index}
                                            ref = { item.ref}
                                        />
                                    </Paper>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                </div>
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Enfant ({child})</Typography>
                    <Grid container spacing={1}>
                        {
                            ChildList.map(item=>(
                                <Grid item key={item.index} style={{marginTop:20}}>
                                    <Paper
                                        variant="outlined"
                                        style={{padding:15}}
                                    >
                                        <Typography>Enfant ({item.index})</Typography>
                                        <PassengerInput 
                                            type="child"
                                            keyId = {"child"+item.index}
                                            ref = { item.ref}
                                        />
                                    </Paper>
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                </div>
                <div style={{marginTop:30}}>
                    <Typography variant="h6">Bebe ({baby})</Typography>
                    <Grid container spacing={1}>
                        {
                            BabyList.map(item=>(
                                <Grid item key={item.index} style={{marginTop:20}}>
                                    <Paper
                                        variant="outlined"
                                        style={{padding:15}}
                                    >
                                        <Typography>Bebe ({item.index})</Typography>
                                        <PassengerInput
                                            type="baby"
                                            keyId = {"baby"+item.index}
                                            ref = { item.ref}
                                        />
                                    </Paper>        
                                </Grid>
                            ))
                        }
                        
                    </Grid>
                </div>
                <ButtonNextPrevious
                    stepLenght ={5}
                    currentStep={currentStep}
                    goNext ={handlerSubmit}
                    goPrivious ={goPrivious}
                />
            </Container>
        </div>
    )
})

export default StepPassengerContainer
