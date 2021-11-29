import * as React from 'react';
import Typography from "@mui/material/Typography"
import SeatPlace from '../SeatPlace';
import { SeatsInterface, CabineConfigurationInterface, ReservationInterface, RDtype } from "../../core/type";
import { SeatConfigContext } from "../../core/context";

export declare type TypeReserve = "reserve" | "unreserve";

export declare type handlerDispatchFuncType = (type:TypeReserve, payload : {user?:string, seat :string})=>void;
export declare type CabineFuncActionType = (
        reserve: ReservationInterface, 
        type ?: TypeReserve, 
        seat ?: SeatsInterface, 
        user ?:string ,
        callback?: handlerDispatchFuncType 
    ) => any
interface CabinesProps {
    dataConfig: CabineConfigurationInterface,
    user?: string,
    actions ?: CabineFuncActionType
}


export const Cabines = React.forwardRef<any, CabinesProps>(({ user,actions}, ref) => {
    //
    const cabRef = React.useRef<any>(null);
    const { 
        dispatcher, 
        reservations, 
        defaultReservation, 
        devMod, 
        clipboard, 
        precomposition, 
        selectedTrajet,
        x
    } = React.useContext(SeatConfigContext);

    React.useImperativeHandle(ref, () => ({
        handlerDispatch,
        values : cabRef.current
    }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    const allReservations =  {...reservations, ...defaultReservation};

    const handlerAction = React.useCallback(
        (type :TypeReserve,e:SeatsInterface, callback : handlerDispatchFuncType)=> {
            // affect to value to ref cabine
            cabRef.current = { type, data : { user, seat : e.id}}
            actions ? actions(allReservations,type, e ,user, callback) : callback(type, { user, seat : e.id});        
    },[actions, allReservations, user]);

    const handlerDispatch : handlerDispatchFuncType = React.useCallback((action , payload)=>{
        dispatcher({
            type : action === "unreserve" ? "handlerUnreserve" : "handlerReserve",
            payload,
        });
    },[dispatcher])

    const onPress = React.useCallback((e: SeatsInterface) => {
        if (devMod) {
            console.log("on press", devMod, clipboard)
            dispatcher({
                type: "handlerChangeType",
                payload: { ...e, type: clipboard }
            });
        } else {
            // 
            if (e.type === "SEAT") {
                if( e.id in allReservations){
                    const exitSeat  = allReservations[e.id];
                    if (exitSeat) {
                        const ownReserve = inTrajet(exitSeat, selectedTrajet );
                        if (ownReserve){
                            if(ownReserve.user === "user"){
                                handlerAction("unreserve",e , handlerDispatch)
                            }else{
                                alert("la place est deja prise, veiller selectionner un android vide")
                            }
                        }
                    }
                }
                handlerAction("reserve", e, handlerDispatch)
            }
            
        }
    },[allReservations, clipboard, devMod, dispatcher, handlerAction, handlerDispatch, selectedTrajet]);

    return (
        <div>
            <table>
                <tbody>
                    <HeaderName nt={parseInt(x.toString())} left="#" right="#"/>
                    {
                        precomposition.map(
                            (i, index) => (
                                <Tr
                                    n = {index}
                                    trajet = { selectedTrajet}
                                    devMod={devMod}
                                    onPress={onPress}
                                    key={i.id} list={i.data}
                                    user={user}
                                    reservations={allReservations}
                                />
                            )
                        )
                    }
                    <HeaderName nt={parseInt(x.toString())} left="#" right="#"/>
                </tbody>
            </table>
        </div>
    )
})

const Tr: React.FC<{
    list: SeatsInterface[],
    devMod: boolean, onPress: (e?: any) => void,
    reservations?: ReservationInterface,
    trajet : number[],
    user?: string,
    n : number;
}> = ({list, devMod, reservations = {}, user, onPress, trajet, n }) => {

    
    const getColors = React.useCallback((seat: SeatsInterface) => {
        // 
        let result: {
            desable: boolean,
            color: "primary" | "secondary" | "inherit" | "info" | "success" | "error" | "warning" | undefined
        } = { desable: false, color: undefined }
        
        // 
        if (seat.type === "SEAT") {
            if( seat.id in reservations){
                const exitSeat  = reservations[seat.id];
                if (exitSeat) {
                    const ownReserve = inTrajet(exitSeat, trajet);
                    if (ownReserve){
                        if(ownReserve.user === user){
                            result.color = "primary";
                        }else{
                            result.desable = true;
                        }
                    }
                }
                
            }else{
                result.color = "secondary"
            }
        }
        return result;
    },[reservations, trajet, user])

    const handlerClick = React.useCallback((i)=>onPress(i),[onPress])
    
    return (
        <tr>
            <TDName name ={String.fromCharCode( n + 65 )} />
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
            <TDName name ={String.fromCharCode( n + 65 )}/>
        </tr>
    )
}

const HeaderName = ({nt, left, right}:{nt:number, left:any, right: any})=>{
    return (
        <tr>
            <TDName name ={left}/>
            {
                Array.from(Array(nt).keys()).map((_,index)=>(
                    <TDName key={index} name ={String.fromCharCode( index + 65 )}/>
                ))
            }
            <TDName name ={right}/>
        </tr>
    )
}


const TDName = ({name}:{name:string})=>{
    return (
        <td style = {{ textAlign:"center" , padding:15}}>
            <Typography 
                variant="caption" 
                textAlign="center"
                sx ={{p:1}}
            >
                { name}
            </Typography>
        </td>
    )
}

const inTrajet = (userTrajet:RDtype[], trajet :number[])=>{
    const [ start ] = trajet;
    return userTrajet.find(i=>{
        const [, iEnd] = i.trajet;
        return iEnd > start
    })
}