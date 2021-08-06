import { ID, MixindataInterface, RoutingInterface } from "../../../utils/@types/transport";

export declare type PassengerReserved = {
    adult: number;
    child: number;
    baby: number;
}

export interface Reservations {
    whereFrom: string;
    whreTo:string;
    dateDeparture:any;
    dateReturn:any;
    passengers: PassengerReserved;
    onlyDirect: boolean;
}

export interface PlaceReservedInterface extends MixindataInterface{
    expired: boolean;
    seat: ID;
    passenger: ID;
    routing: RoutingInterface[];
}