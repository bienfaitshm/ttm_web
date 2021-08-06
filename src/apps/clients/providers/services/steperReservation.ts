import { GO_TO_STEP, NEXT_STEP, PREVIOUS_STEP } from "./constants";
import { SteperReservationInterface } from "../../@types/reducers";
import { ActionReducer } from "../../../../utils/@types/store";
import { useReservations } from "../hooks";
import React from "react";
import { useDispatch } from "react-redux";
import Querystr from "query-string";
import { useHistory } from "react-router-dom";
import { apis, COMPANY_URL } from "../../config";


const INITIAL_STATE : SteperReservationInterface = {
    currentStep: 0,
    maxStep: 0,
    padSteper: null,
    company : null,
}


export const steperReservation = (state=INITIAL_STATE, action: ActionReducer): SteperReservationInterface=>{
    switch (action.type) {
        case PREVIOUS_STEP:
            return {...state, padSteper : PREVIOUS_STEP, currentStep : state.currentStep - 1 };
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
    },[parced, push])
}
