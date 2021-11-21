import * as React from 'react'
import { Container, Typography,Grid, Paper} from '@material-ui/core'
import PassengerInput from '../../components/Personnal/PassengerInput'
import { useSteperAction } from '../../providers/services/steperReservation'
import ButtonNextPrevious from '../../components/ButtonNextPrevious'
import { getSteps } from './StepContainer'
import { FormikProps } from 'formik'
import { Passenger } from '../../@types/personnal'
import { usePassengerInfoStepMutation } from '../../../../utils/apis/graphql/mutation'
import { StepReservationInterface} from "./step-reservation-interface";
import { StepReservationContext } from "./context-reservations";

const createRefPassenger = (index:number)=>{
    const ref = React.createRef<FormikProps<Passenger>>();
    return {
        ref,
        index: index + 1
    }
}

export interface StepPassengerContainerProps extends StepReservationInterface{
   
}
const StepPassengerContainer = React.forwardRef<any,StepPassengerContainerProps>((props, ref) => {
    const {session, adult, child, baby} = React.useContext(StepReservationContext);

    const { passengers, currentStep, goPrivious, goNext }  = useSteperAction();
    const [handlerSubumitMut, {loading}] = usePassengerInfoStepMutation()

    const AdultList = React.useMemo(()=>{
        return Array.from(Array(adult).keys()).map((item, index)=>createRefPassenger(index))
    },[adult]);

    
    const BabyList = React.useMemo(()=>{
        return Array.from(Array(baby).keys()).map((item, index)=>createRefPassenger(index))
    },[baby]);

    const ChildList = React.useMemo(()=>{
        return Array.from(Array(child).keys()).map((item, index)=>createRefPassenger(index))
    },[child]);

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
            console.log(res)
            goNext()
        }).catch(error=>{
            console.log(error.networkError.result)
            console.log(JSON.stringify(error))
        })
    },[goNext, handlerSubumitMut, session]);


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
                    <Typography variant="h6">Enfant ({passengers?.child})</Typography>
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
                    <Typography variant="h6">Bebe ({passengers?.baby})</Typography>
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
