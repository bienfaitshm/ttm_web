import { SteperReservationInterface } from "../../@types/reducers";
import { ActionReducer } from "../../../../utils/@types/store";
import { useReservations } from "../hooks";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Querystr from "query-string";
import { useHistory } from "react-router-dom";
import { apis, COMPANY_URL } from "../../config";
import { JourneyInterface } from "../../../../utils/@types/transport";
import { PassengerReserved } from "../../@types/reserve";
import { 
    GO_TO_STEP, NEXT_STEP, PREVIOUS_STEP, 
    RESET_RESERVATION, 
    SELECT_JOURNEY, SET_PASSENGER, SET_SESSION 
} from "./constants";


const INITIAL_STATE : SteperReservationInterface = {
    currentStep: 0,
    maxStep: 0,
    padSteper: null,
    company : null,
    journeySelected:undefined,
    passengers:undefined,
    sessionReservation:null,
}


export const steperReservation = (state=INITIAL_STATE, action: ActionReducer): SteperReservationInterface=>{
    switch (action.type) {
        case PREVIOUS_STEP:
            return {...state, padSteper : PREVIOUS_STEP, currentStep : state.currentStep - 1 };
        case SELECT_JOURNEY:
            return {
                ...state,
                journeySelected : action.payload
            }
        case SET_PASSENGER:
            return {
                ...state,
                passengers:action.payload
            }
        case SET_SESSION:
            return {
                ...state,
                sessionReservation: action.payload
            }
        case NEXT_STEP:
            const currentStep = state.currentStep + 1 ;
            return {
                ...state, 
                padSteper : NEXT_STEP ,
                currentStep , 
                maxStep : currentStep > state.maxStep ? currentStep : state.maxStep 
            };
        case GO_TO_STEP:
            return {...state, padSteper: GO_TO_STEP, currentStep : action.payload}
        case RESET_RESERVATION:
            return {
                ...state,
                currentStep :0,
                journeySelected :undefined,
                maxStep:0,
                sessionReservation:undefined,
            }
        default:
            return state;
    }
}

// functions...

export const useSteperAction = ()=>{
    const reservations = useReservations();
    const dispatch = useDispatch();
    const goTo = React.useCallback((n :number)=>{
        dispatch({
            type : GO_TO_STEP,
            payload : n
        })
    },[dispatch])

    const goNext = React.useCallback(()=>{
        dispatch({
            type : NEXT_STEP
        })
    },[dispatch])

    const goPrivious = React.useCallback(()=>{
        dispatch({
            type : PREVIOUS_STEP
        })
    },[dispatch])


    return { ...reservations, goTo, goPrivious, goNext }
}

export function resetReservation():ActionReducer{
    return {
        type : SELECT_JOURNEY,
        payload:null
    }
}
export function selectJourney (journey:JourneyInterface):ActionReducer{
    return {
        type : SELECT_JOURNEY,
        payload: journey
    }
}

export function setPassangers (value:PassengerReserved):ActionReducer{
    return {
        type : SET_PASSENGER,
        payload: value
    }
}

export function setSessionJourney (value:any):ActionReducer{
    return {
        type : SET_SESSION,
        payload: value
    }
}

export const useUriHome = ()=>{
    const dispatch = useDispatch();
    const { company } = useSteperAction();
    const {location, push} = useHistory();
    const parced:any = Querystr.parse(location.search);

    React.useEffect(()=>{
        if(!parced.cpnid && company?.id){
            push("?cpnid="+company.id)
        }else if(parced.cpnid && !company?.id){
            apis.get(COMPANY_URL+parced.cpnid+"/")
                .then(res=>{
                    console.log("result",res)
                })
                .catch(err=>{
                    console.log("error",err)
                })
        }
        console.log("parced",parced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
}

export const useSeletedJourney = ()=>{
    const dispatch = useDispatch();
    return useCallback((value:JourneyInterface)=>{
        dispatch(selectJourney(value));
    },[dispatch])
}
export const useSetSessionJourney = ()=>{
    const dispatch = useDispatch();
    return useCallback((value:any)=>{
        dispatch(setSessionJourney(value));
    },[dispatch])
}

export const useSetPassenger = ()=>{
    const dispatch = useDispatch();
    return useCallback((value:PassengerReserved)=>{
        dispatch(setPassangers(value));
    },[dispatch])
}