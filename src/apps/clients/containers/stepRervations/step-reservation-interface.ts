
export interface StepReservationInterface {
    session : string;
    lastStep : number;
}

export interface ReservationContextInterface extends StepReservationInterface{
    passengers ?:any[],
    seats ?: any[],
    journeySelected:any;
    setStep : ()=>void;
    selectedPassenger :any;
    adult : number;
    child :number;
    baby : number;
    id ?:any;
}

export interface ReservationActionInterface {
    type : string;
    payload :any;
}