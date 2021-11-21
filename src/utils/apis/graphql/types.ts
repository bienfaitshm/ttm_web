
type ID = string | number;
type SeaType = "SEAT" | "SPACE";
type DeviseType = "USD" | "CDF";

export interface ComonMixin{
    id ?: ID;
}

export interface PageInfoInterface{
    hasNextPage :boolean;
    hasPreviousPage :boolean;
    startCursor :string;
    endCursor :string;
}

export interface WithDateInterface extends ComonMixin{
    dateCreated : any;
    dateUpdated : any;
}

export interface CompanyInterface extends WithDateInterface{
    nom  :string;
    code :string;
    slogan :string;
    mail :string;
    responsable :string;
    description :string;
}

export interface ConfigCabInterface extends WithDateInterface{
    company :CompanyInterface;
    name :string;
    devMode :boolean;
    x : number;
    y : number;
    clipboard : SeaType
}

export interface SeatInterface extends WithDateInterface{
    configCab : ConfigCabInterface;
    name :string;
    type : SeaType;
    y : number;
    x :number;
}

export interface CarsInterface extends WithDateInterface{
    configCab : ConfigCabInterface;
    codeAppareil :string;
    immatriculation:string;
    typeAppareil :string;
}

export interface CoverType extends WithDateInterface{
    town :string;
    code :string;
    latitude :number;
    longitude :number;
    company :CompanyInterface;
}

export interface RoutingInterface extends WithDateInterface{
    company :CompanyInterface;
    whereFrom : CoverType;
    whereTo : CoverType;
}
export interface JourneyInterface<Rout = RoutingInterface, Car = CarsInterface>  extends WithDateInterface{
    numJourney : string;
    price :string;
    devise : DeviseType;
    dateDeparture: any;
    dateReturn :any;
    hoursDeparture :any;
    hoursReturn :any;
    routeNames :string;
    cars : Car;
    routing : Rout;
}

export interface JourneySelected{
    numberAdult:number
    numberChild :number
    numberBaby:number
    lastStep:number;
    folder?:{
        number:string;
        session:string
    };
    session?:{
        key ?:string
    };
    journey : JourneyInterface;
}

export interface ConnexionTypeInterface<T>{
    pageInfo : PageInfoInterface;
    edges:{
        cursor :string;
        node: T
    }[]
}