import * as React from 'react';
import SeatPlace from '../SeatPlace';
import { SeatsInterface, CabineConfigurationInterface, ReservationInterface } from "../../core/type";

interface CabinesProps {
    dataConfig: CabineConfigurationInterface,
    dispatch: (e?: any) => any,
    user?: string,
    actions?: (e: any) => any
}


export const Cabines: React.FC<CabinesProps> = (props) => {
    const { reservations, defaultReservation, devMod, clipboard, precomposition } = props.dataConfig;
    const allReservations = [...reservations, ...defaultReservation];

    const onPress = (e: SeatsInterface) => {
        console.log(e)
        if (devMod) {
            props.dispatch({
                type: "handlerChangeType",
                payload: { ...e, type: clipboard }
            });
        } else {
            // 
            const isAllreadyExist = allReservations.find(i => i.seat === e.id);
            if (e.type === "SEAT") {
                if (isAllreadyExist) {
                    if (isAllreadyExist.user === props.user) {
                        props.dispatch({
                            type: "handlerUnreserve",
                            payload: { seat: e.id, user: props.user }
                        });
                        console.log("unreserve")
                    } else {
                        alert("la place est deja prise, veiller selectionner un android vide")
                    }
                    console.log("allready")
                } else {
                    props.dispatch({
                        type: "handlerReserve",
                        payload: { seat: e.id, user: props.user }
                    });
                }
            }
        }
    }
    return (
        <div>
            <table>
                <tbody>
                    {
                        precomposition.map(i => <Tr
                            devMod={devMod}
                            onPress={onPress}
                            key={i.id} list={i.data}
                            user={props.user}
                            reservations={allReservations}
                        />)
                    }
                </tbody>
            </table>
            { props.actions && props.actions(reservations)}
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