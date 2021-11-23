import * as React from 'react';
import {ReservationContextInterface, ReservationActionInterface} from "./step-reservation-interface";

const initialState :ReservationContextInterface = {
    passengers: [],
    session:"",
    lastStep:0,
    activeStep:0,
    selectedPassenger : null,
    cars:null,
    adult:1,
    baby:0,
    child:0,
    id:null,
}


function reducer(state: ReservationContextInterface, action: ReservationActionInterface): ReservationContextInterface {
    console.log(action)
    switch (action.type) {
        case 'set_step':
            return {...state, lastStep : action.payload}
        case 'set_session':
            return {...state, session : action.payload}
        case 'set_active_step':
            return {...state, activeStep : action.payload}
        case 'set_seating':
            const lastStep = action.payload.lastStep;
            return { ...state, 
                lastStep ,
                activeStep : lastStep,
                passengers : action.payload.passengers,
                cars : action.payload.cars,
                journeySeats : action.payload.journeySeats,
            }
        case 'initialise':
            return {...state, ...action.payload}
        default:
            return state;
    }
}


export const StepReservationContext = React.createContext<ReservationContextInterface>(initialState);

interface StepValueInit {
    adult:number,
    baby:number,
    child:number,
    id?:any,
    session :string;
    lastStep : number;
    activeStep :number;
}

export const StepReservationProvider: React.FC<{value: StepValueInit}> = ({ children, value }) => {
    const [_value, setValue] = React.useReducer(reducer, initialState);
    const setStep = React.useCallback((e:ReservationActionInterface)=>setValue(e),[]);
    React.useEffect(()=>{
        setValue({
            type: "initialise",
            payload : value
        });
    },[value])
    return <StepReservationContext.Provider value={{..._value, setStep}}>{children}</StepReservationContext.Provider>
}