
import * as React from 'react';
import { dataPrecomposion, CabineConfigurationInterface, SeatsInterface } from "./type";
import { getDecomposition } from "../core/funct"
export interface Actions {
    type: string,
    payload?: any
}
// defaultValue
export const intialStateSeatConfiguration: CabineConfigurationInterface = {
    clipboard: "SEAT",
    defaultReservation: [{ seat: "8d083a81-3fc6-4513-aac0-abf376b46773", user: "3456io" }],
    precomposition: [],
    devMod: false,
    reservations: [],
    x: 0,
    y: 0
}
export const SeatConfigContext = React.createContext<CabineConfigurationInterface>(intialStateSeatConfiguration)

// function reducer
export function SeatConfigReducer(state: CabineConfigurationInterface, action: Actions) {
    // console.log(state, action);
    switch (action.type) {
        case "handlerInit":
            const precomposition = getDecomposition(action.payload.precomposition, action.payload.y)
            // console.log("handlerInit", action.payload, precomposition);
            return { ...state, ...action.payload, precomposition };
        case "handlerChangeModDev":
            return { ...state, devMod: action.payload };
        case "handlerChangeX":
            return { ...state, x: action.payload };
        case "handlerChangeY":
            return { ...state, y: action.payload };
        case "handlerReserve":
            return { ...state, reservations: [...state.reservations, action.payload] };
        case "handlerUnreserve":
            return { ...state, reservations: state.reservations.filter(i => i.seat !== action.payload.seat) };
        case "handlerDefaultReserve":
            return { ...state, reservations: [...state.reservations, action.payload] };
        case "handlerDefaultUnreserve":
            return { ...state, reservations: state.reservations.filter(i => i.seat === action.payload) };
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