import { useEffect, useState } from "react";
import { apis, JOURNEY_URL } from "../config"

export const fetcher = (url:any)=> apis.get(url).then(res => res.data)
export const fetcherWithParams = (url:any, params?:any)=>apis.get(url, params).then(res => res.data)

export const useWithloader = ()=>{
    return  useState<{
        data?:any,
        isLoading: boolean,
        isError?:any,
    }>({
        data:null,
        isLoading: false,
        isError: null
    });
}
export const useSearchJourney = (params:object)=>{
    const [result, setResult] = useWithloader();
    useEffect(()=>{
        setResult(state=>({...state, isLoading:true}))
        apis.get(JOURNEY_URL,{params}).then(res=>{
            setResult(state=>({...state, data:res.data, isLoading:false}))
        }).catch(error=>{
            setResult(state=>({...state, isError:error,isLoading:false}))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return result;
}