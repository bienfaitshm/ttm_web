// module of type of data

/**
*general config of the seating
*
* @type {string}
* @memberof SeatsInterface 
* 
*/
export interface SeatsInterface {
    id :string,
    name ?:string,
    x : number,
    y : number,
    type : "SEAT" | "SPACE",
    idConfigCab : string
}

/**
 *
 *
 * @type {(string | SeatsInterface)}
 * @memberof ReservationInterface
 */
export interface ReservationInterface {
    seat : string | SeatsInterface,
    user : string
}

export interface TrajetType{
    label : string;
    value : number;
}
export interface dataPrecomposion{
    id :string | number,
    data : SeatsInterface[]
}

/**
 *
 *
 * @type {}
 * @memberof CabineConfigurationInterface
 */
export interface CabineConfigurationInterface{    
    devMod : boolean,
    x : number | string,
    y : number |string,
    precomposition : dataPrecomposion[],
    reservations : ReservationInterface[],
    defaultReservation : ReservationInterface[],
    trajets: TrajetType[];
    selectedTrajet: number[];
    clipboard : "SEAT"|"SPACE";
}