import * as React from 'react';
import { SeatConfigContext, SeatConfigReducer , intialStateSeatConfiguration } from "../../core/context";

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
    return (
        <SeatConfigContext.Provider value={state}>
            { children(dispatch) }
        </SeatConfigContext.Provider>
    )
}