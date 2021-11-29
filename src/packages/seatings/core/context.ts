
import * as React from 'react';
import { dataPrecomposion, CabineConfigurationInterface, SeatsInterface, Actions } from "./type";
import { getDecomposition, getComp  } from "../core/funct"

// defaultValue
export const intialStateSeatConfiguration: CabineConfigurationInterface = {
    dispatcher : (e)=>{
        console.log(e)
    },
    clipboard: "SEAT",
    defaultReservation: {
    },
    precomposition: [],
    devMod: false,
    reservations: {
        "71": [
            {
                user: "3456io",
                trajet:[0,2] 
            }
        ]
    },
    selectedTrajet:[],
    trajets :[], 
    x: 0,
    y: 0
}
export const SeatConfigContext = React.createContext<CabineConfigurationInterface>(intialStateSeatConfiguration)

// function reducer
export function SeatConfigReducer(state: CabineConfigurationInterface, action: Actions) {
    console.log(state, action);
    switch (action.type) {
        case "handlerInit":
            const precomposition = getDecomposition(action.payload.precomposition, action.payload.y)
            const d = getComp(action.payload.precomposition)
            console.log("handlerInit", precomposition, d);
            return { ...state, ...action.payload, precomposition };
        case "handlerChangeModDev":
            return { ...state, devMod: action.payload };
        case "handlerChangeSelectTrajet":
            return {
                ...state,
                selectedTrajet: action.payload
            }
        case "handlerSetTrajet":
            return {
                ...state,
                trajets: action.payload
            }
        case "handlerChangeX":
            return { ...state, x: action.payload };
        case "handlerChangeY":
            return { ...state, y: action.payload };
        case "handlerReserve":
            return addReservations(state, action.payload);
        case "handlerUnreserve":
            return removeReservations(state, action.payload);
        case "handlerDefaultReserve":
            return addReservations(state, action.payload);
        case "handlerDefaultUnreserve":
            return removeReservations(state, action.payload);
        case "handlerChangeClipboard":
            return { ...state, clipboard: action.payload };
        case "handlerPrecompose":
            return { ...state, precomposition: precompose(state.x, state.y) };
        case "handlerChangeType":
            return { ...state, precomposition: onChangeTypeOfSeat(state.precomposition, action.payload) };
        default:
            return state;
    }
}

function addReservations(state:CabineConfigurationInterface, payload :any ) :  CabineConfigurationInterface {
    const {user, seat} = payload;
    const newReservationUser = {trajet: state.selectedTrajet, user}
    const reservations = {
        ...state.reservations,
        [seat] : state.reservations[seat] ? [ newReservationUser, ...state.reservations[seat]] : [newReservationUser ]
    }
    return { ...state, reservations}
}

function removeReservations(state:CabineConfigurationInterface, payload :any ) :  CabineConfigurationInterface {
    
    return { ...state, }
}

function precompose(x: string | number, y: string | number): dataPrecomposion[] {
    let col: dataPrecomposion[] = []
    for (let i = 0; i < y; i++) {
        let line: SeatsInterface[] = []
        for (let j = 0; j < x; j++) { line.push(getSeat(j.toString(), i.toString())); }
        col.push({ id: i, data: line });
    }
    return col;
}

function getSeat(x: string, y: string): SeatsInterface {
    const name = `${x}-${y}`;
    let data: SeatsInterface = { id: name, idConfigCab: "", type: "SEAT", x: parseInt(x), y: parseInt(y), name }
    return data;
}

function onChangeTypeOfSeat(precomposition: dataPrecomposion[], seat: SeatsInterface): dataPrecomposion[] {
    return precomposition.map(i => {
        if (i.id === seat.y) {
            return {
                id: i.id,
                data: i.data.map(seatObject => seatObject.id === seat.id ? seat : seatObject)
            }
        } else {
            return i
        }
    })
}