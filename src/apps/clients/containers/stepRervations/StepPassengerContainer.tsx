import * as React from 'react'
import { Container, Typography,Grid, Paper} from '@material-ui/core'
import PassengerInput from '../../components/Personnal/PassengerInput'
import { useSteperAction } from '../../providers/services/steperReservation'
import ButtonNextPrevious from '../../components/ButtonNextPrevious'
import { getSteps } from '../StepContainer'
import { FormikProps } from 'formik'
import { Passenger } from '../../@types/personnal'

const createRefPassenger = (index:number)=>{
    const ref = React.createRef<FormikProps<Passenger>>();
    return {
        ref,
        index: index + 1
    }
}

const StepPassengerContainer = React.forwardRef<HTMLDivElement,any>((props, ref) => {
    const { passengers, currentStep, goPrivious }  = useSteperAction();

    const AdultList = React.useMemo(()=>{
        return Array.from(Array(passengers?.adult).keys()).map((item, index)=>createRefPassenger(index))
    },[passengers])

    
    const BabyList = React.useMemo(()=>{
        return Array.from(Array(passengers?.baby).keys()).map((item, index)=>createRefPassenger(index))
    },[passengers]);

    const ChildList = React.useMemo(()=>{
        return Array.from(Array(passengers?.child).keys()).map((item, index)=>createRefPassenger(index))
    },[passengers])

    const onValideUserPassenger = React.useCallback((e: (FormikProps<Passenger> | null)[])=>{
        let values:Passenger[]= []
        for (let index = 0; index < e.length; index++) {
            const element = e[index];
            if(!element) return;
            if(!element.isValid) return;
            const { key, ...restOfValues } = element.values
            values.push(restOfValues);
        }
        console.log("values", values)
    },[]);

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
