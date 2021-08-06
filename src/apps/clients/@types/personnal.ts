
export declare type Gender = "H" | "F" | "INDER";
export declare type TitleGender = "Mr" | "Md" | "O";
export declare type IndentityType = "passport" | "countryCard"

export interface Passenger{
    firstname : string;
    middlename?:string;
    lastname:string;
    birthDay :string;
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