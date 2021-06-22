import * as React from 'react';
import { SeatConfigContext } from "../core/context";
import { Cabines } from '../components/Cabine';

interface Props {
    dispatch: (e?: any) => any,
    user?: string,
    defaultConfiguration?: any,
    actions?: (e: any) => any
}


export const MainPlaceContainer: React.FC<Props> = (props) => {
    const dataConfig = React.useContext(SeatConfigContext);
    React.useEffect(() => {
        if (props.defaultConfiguration) {
            props.dispatch({
                type: "handlerInit",
                payload: props.defaultConfiguration
            })
        }
    }, [])
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Cabines
                dataConfig={dataConfig}
                dispatch={props.dispatch}
                user={props.user}
                actions={props.actions}
            />
        </div>
    )
}