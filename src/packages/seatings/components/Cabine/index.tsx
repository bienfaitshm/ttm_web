import * as React from 'react';
import Typography from "@mui/material/Typography"
import SeatPlace from '../SeatPlace';
import { SeatsInterface, CabineConfigurationInterface, ReservationInterface } from "../../core/type";


export declare type TypeReserve = "reserve" | "unreserve";
export declare type handlerDispatchFuncType = (type:TypeReserve, payload : {user?:string, seat :string})=>void;
export declare type CabineFuncActionType = (
        reserve: ReservationInterface[], 
        type ?: TypeReserve, 
        seat ?: SeatsInterface, 
        user ?:string ,
        callback?: handlerDispatchFuncType 
    ) => any
interface CabinesProps {
    dataConfig: CabineConfigurationInterface,
    dispatch: (e?: any) => any,
    user?: string,
    actions ?: CabineFuncActionType
}


export const Cabines = React.forwardRef<any, CabinesProps>(({dataConfig, dispatch,user,actions}, ref) => {
    //
    const cabRef = React.useRef<any>(null);
    React.useImperativeHandle(ref, () => ({
        handlerDispatch,
        values : cabRef.current
    }))
    
    const { reservations, defaultReservation, devMod, clipboard, precomposition } = dataConfig;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const allReservations = [...reservations, ...defaultReservation];

    const handlerAction = React.useCallback(
        (type :TypeReserve,e:SeatsInterface, callback : handlerDispatchFuncType)=> {
            // affect to value to ref cabine
            cabRef.current = { type, data : { user, seat : e.id}}
            actions ? actions(reservations,type, e ,user, callback) : callback(type, { user, seat : e.id});        
    },[actions, reservations, user])

    const handlerDispatch : handlerDispatchFuncType = React.useCallback((action , payload)=>{
        dispatch({
            type : action === "unreserve" ? "handlerUnreserve" : "handlerReserve",
            payload,
        });
    },[dispatch])

    const onPress = React.useCallback((e: SeatsInterface) => {
        if (devMod) {
            console.log("on press", devMod, clipboard)
            dispatch({
                type: "handlerChangeType",
                payload: { ...e, type: clipboard }
            });
        } else {
            // 
            const isAllreadyExist = allReservations.find(i => i.seat === e.id);
            if (e.type === "SEAT") {
                if (isAllreadyExist) {
                    if (isAllreadyExist.user === user) {                       
                        handlerAction("unreserve",e , handlerDispatch)
                    } else {
                        alert("la place est deja prise, veiller selectionner un android vide")
                    }
                    console.log("allready")
                } else {
                    handlerAction("reserve", e, handlerDispatch)
                }
            }
        }
    },[allReservations, clipboard, devMod, dispatch, handlerAction, handlerDispatch, user]);

    return (
        <div>
            <table>
                <tbody>
                    <HeaderName />
                    {
                        precomposition.map(
                            i => <Tr
                                devMod={devMod}
                                onPress={onPress}
                                key={i.id} list={i.data}
                                user={user}
                                reservations={allReservations}
                            />
                        )
                    }
                    <HeaderName />
                </tbody>
            </table>
        </div>
    )
})

const Tr: React.FC<{
    list: SeatsInterface[],
    devMod: boolean, onPress: (e?: any) => void,
    reservations?: ReservationInterface[],
    user?: string
}> = ({list, devMod, reservations, user, onPress }) => {

    const getColors = React.useCallback((seat: SeatsInterface) => {
        // 
        let result: {
            desable: boolean,
            color: "primary" | "secondary" | "inherit" | "info" | "success" | "error" | "warning" | undefined
        } = { desable: false, color: undefined }
        
        // 
        if (seat.type === "SEAT") {
            const exitSeat = reservations?.find(e => e.seat === seat.id);
            if (exitSeat) {
                if (exitSeat?.user === user) {
                    result.color = "primary"
                } else {
                    result.color = undefined
                    result.desable = true;
                }
            } else {
                result.color = "secondary"
            }
        }
        return result;
    },[reservations, user])

    const handlerClick = React.useCallback((i)=>onPress(i),[onPress])
    
    return (
        <tr>
            <TDName />
            {list.map(
                i => {
                    const { desable, color } = getColors(i)
                    return (
                        <td key={i.id}>
                            <SeatPlace
                                color = {color}
                                disabled={desable}
                                info={i}
                                onPress={handlerClick}
                                modeDev={devMod}
                            />
                        </td>
                    )
                }
            )}
            <TDName />
        </tr>
    )
}

const HeaderName = ()=>{
    return (
        <tr><TDName /><TDName /><TDName /><TDName /></tr>
    )
}

const TDName = ()=>{
    return (
        <td style = {{ textAlign:"center" }}>
            <Typography 
                variant="caption" 
                textAlign="center"
                sx ={{p:1}}
            >
                A
            </Typography>
        </td>
    )
}