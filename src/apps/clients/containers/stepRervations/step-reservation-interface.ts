
export interface StepReservationInterface {
    session : string;
    lastStep : number;
}

export interface ReservationContextInterface extends StepReservationInterface{
    activeStep : number;
    passengers ?:any[],
    journeySeats ?: any[]
    trajets :any[],
    cars ?: any,
    setStep ?: (e:ReservationActionInterface)=>void;
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