import * as React from 'react';
import {ReservationContextInterface, ReservationActionInterface} from "./step-reservation-interface";

const initialState :ReservationContextInterface = {
    seats:[],
    passengers: [],
    session:"",
    lastStep:1,
    setStep:()=>{},
    journeySelected:{},
    selectedPassenger : null,
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
}
export const StepReservationProvider: React.FC<{value: StepValueInit}> = ({ children, value }) => {
    const [_value, setValue] = React.useReducer(reducer, initialState);
    React.useEffect(()=>{
        setValue({
            type: "initialise",
            payload : value
        });
    },[value])
    return <StepReservationContext.Provider value={_value}>{children}</StepReservationContext.Provider>
}