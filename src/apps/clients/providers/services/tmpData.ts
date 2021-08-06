import { ActionReducer } from "../../../../utils/@types/store"

const passengerValueInit = {
    key :0,
    firstname: "",
    middlename: "",
    lastname: "",
    birthDay: "2019-08-24",
    gender: "M",
    typeUser: "adult",
    journey: 0,
}

const INITIAL_STATE = {
    adults : [],
    children : [],
    babies : [],
}

const INIT_PASSENGER = "INIT_PASSENGER";
const SET_VALUE_PASSENGER = "SET_VALUE_PASSENGER";

export const tmpData = (state =INITIAL_STATE, action: ActionReducer)=>{
    switch (action.type) {
        case INIT_PASSENGER :
            const {adult, child, baby} = action.payload;
            return {
                ...state,
                ...initPassengerArrayValue(adult, child, baby)
            }
        case SET_VALUE_PASSENGER:
            return {
                ...state
            }
        default:
            return state;
    }
}

const initPassengerArrayValue = (adult:number, child:number, baby:number)=>{
    return {
        adults : [],
        children : [],
        babies : [],
    }
}