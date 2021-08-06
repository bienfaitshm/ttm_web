
export type ID = string | string;

export interface MixindataInterface {
    id?: ID;
    data_created?:any;
    data_updated?:any;   
    company?: ID;
}


export interface CoverCityInterface extends MixindataInterface{
    town: string;
    code: string;
    latitude: number;
    longitude: number;
}

export interface RoutingInterface extends MixindataInterface{
    whereFrom: ID;
    whreTo: ID;
}


export interface PosWorkerInterface extends MixindataInterface{
    worker: ID;
    pointOfSale: ID;
}

export interface PosInterface extends MixindataInterface{
   name: string;
   town: ID;
}

export interface JourneyInterface extends MixindataInterface {   
    numJourney:string;
    price:number;
    dateDeparture:any;
    dateReturn:any;
    hoursDeparture:any;
    hoursReturn:any;
    cars: ID;
    routing: RoutingInterface[];
}