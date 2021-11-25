
export declare type Gender = "H" | "F" | "INDER";
export declare type TitleGender = "Mr" | "Md" | "O";
export declare type IndentityType = "passport" | "countryCard"

export interface Passenger{
    id?: any;
    key?: any;
    firstname : string;
    middlename?:string;
    lastname:string;
    birthDay :string;
    typeUser : "adult"|"child"|"baby"
    gender : Gender;
}

export interface AdultPassenger extends Passenger{
    title :TitleGender
}

export interface AddressPassenger {
    avenue: string;
    commune :string;
    numberHouse : string;
}

export interface AdditionalInfo{
    nIndentity :string;
    typeIndetity :IndentityType;
}