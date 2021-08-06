import { CompanyInterface } from "./apps";

export interface SteperReservationInterface {
    currentStep :number;
    maxStep:number;
    padSteper: string | null;
    company: CompanyInterface | null;
}

export interface RootReducerInterface {
    steperReservation : SteperReservationInterface;
}