import * as React from 'react';
import { SeatConfigContext } from "../core/context";
import { Cabines, CabineFuncActionType } from '../components/Cabine';
interface Props {
    dispatch: (e?: any) => any,
    user?: string,
    defaultConfiguration?: any,
    actions?: CabineFuncActionType,
}


export const MainPlaceContainer = React.forwardRef<any, Props>((props, ref) => {
    const dataConfig = React.useContext(SeatConfigContext);
    const {defaultConfiguration, dispatch} = props;
    React.useEffect(() => {
        if (defaultConfiguration) {
            dispatch({
                type: "handlerInit",
                payload: defaultConfiguration
            })
        }
    }, [defaultConfiguration, dispatch])
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Cabines
                ref= {ref}
                dataConfig={dataConfig}
                dispatch={dispatch}
                user={props.user}
                actions={props.actions}
            />
        </div>
    )
})