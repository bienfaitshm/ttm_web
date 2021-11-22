import * as React from 'react';
import SeatPlace from '../SeatPlace';
import { SeatsInterface, CabineConfigurationInterface, ReservationInterface } from "../../core/type";


export type TypeReserve = "reserve" | "unreserve"
export  type CabineFuncActionType = (reserve: ReservationInterface[], type ?: TypeReserve, seat ?: SeatsInterface, user ?:string ) => any
interface CabinesProps {
    dataConfig: CabineConfigurationInterface,
    dispatch: (e?: any) => any,
    user?: string,
    actions ?: CabineFuncActionType
}


export const Cabines: React.FC<CabinesProps> = ({dataConfig, dispatch,user,actions}) => {
    const { reservations, defaultReservation, devMod, clipboard, precomposition } = dataConfig;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const allReservations = [...reservations, ...defaultReservation];

    const handlerAction = React.useCallback(
        (type :TypeReserve,e:SeatsInterface)=> {
            actions && actions(reservations,type, e ,user);
    },[actions, reservations, user])

    const onPress = React.useCallback((e: SeatsInterface) => {
        if (devMod) {
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
                        dispatch({
                            type: "handlerUnreserve",
                            payload: { seat: e.id, user }
                        });
                        handlerAction("unreserve",e)
                    } else {
                        alert("la place est deja prise, veiller selectionner un android vide")
                    }
                    console.log("allready")
                } else {
                    dispatch({
                        type: "handlerReserve",
                        payload: { seat: e.id, user}
                    });
                    handlerAction("reserve", e)
                }
            }
        }
    },[allReservations, clipboard, devMod, dispatch, handlerAction, user]);

    return (
        <div>
            <table>
                <tbody>
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
                </tbody>
            </table>
        </div>
    )
}

const Tr: React.FC<{
    list: SeatsInterface[],
    devMod: boolean, onPress: (e?: any) => void,
    reservations?: ReservationInterface[],
    user?: string
}> = (props) => {

    const getColors = (seat: SeatsInterface) => {
        let result: {
            desable: boolean,
            color: "primary" | "default" | "secondary"
        } = { desable: false, color: "default" }
        if (seat.type === "SEAT") {
            const exitSeat = props.reservations?.find(e => e.seat === seat.id);
            if (exitSeat) {
                if (exitSeat?.user === props.user) {
                    result.color = "primary"
                } else {
                    result.color = "default"
                    result.desable = true;
                }
            } else {
                result.color = "secondary"
            }
        }
        return result;
    }
    
    return (
        <tr>
            {props.list.map(
                i => {
                    const { desable, color } = getColors(i)
                    return (
                        <td key={i.id}>
                            <SeatPlace
                                color={color}
                                disabled={desable}
                                info={i}
                                onClick={() => props.onPress(i)}
                                modeDev={props.devMod}
                            />
                        </td>
                    )
                }
            )}
        </tr>
    )
}