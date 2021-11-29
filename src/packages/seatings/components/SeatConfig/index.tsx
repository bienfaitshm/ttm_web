import * as React from 'react';
import { SeatConfigContext, SeatConfigReducer , intialStateSeatConfiguration } from "../../core/context";
import { Actions } from "../../core/type";
interface Props{
    children : (e:any)=>any
}

export const SeatConfigConsumer : React.FC<Props> = ({children}) => {
    return (
    <SeatConfigContext.Consumer>{e =>children(e)}</SeatConfigContext.Consumer>
    )
}
export const SeatConfigProvider : React.FC<Props> = ({children}) => {
    const [state, dispatch] = React.useReducer(SeatConfigReducer, intialStateSeatConfiguration)
    const dispatcher  = React.useCallback((e:Actions)=>dispatch(e),[])
    return (
        <SeatConfigContext.Provider value={{...state, dispatcher}}>
            { children(dispatch) }
        </SeatConfigContext.Provider>
    )
}