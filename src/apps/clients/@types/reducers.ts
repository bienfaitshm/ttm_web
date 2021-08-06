import { JourneyInterface } from "../../../utils/@types/transport";
import { CompanyInterface } from "./apps";
import { PassengerReserved } from "./reserve";

export interface SteperReservationInterface {
    currentStep :number;
    maxStep:number;
    padSteper: string | null;
    company: CompanyInterface | null;
    journeySelected ?: JourneyInterface;
    passengers ?: PassengerReserved;
    sessionReservation?:any;
}

export interface TmpDataInterface {
    
}

export interface RootReducerInterface {
    steperReservation : SteperReservationInterface;
    tmpData : TmpDataInterface
}