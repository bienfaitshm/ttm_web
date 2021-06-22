// import * as React from 'react';
import axios from "axios";
// import { apiState, S } from '../../../moduls/api_hoocks';

const url = "http://localhost:8000";
type Dispatch<D> = (s : D)=>void | undefined;

export function useSaveConfig() :[unknown,Dispatch<any>] {
    // const [ state, dispatch ] = apiState();
    const handlerPost = (data : any)=>{
        axios.post(url,data).then(response=>{
            // dispatch({type:"data", payload: response.data});
        }).catch(error=>{
            // dispatch({type:"error", payload: error.request});
        })
    }
    return [{}, handlerPost]
}