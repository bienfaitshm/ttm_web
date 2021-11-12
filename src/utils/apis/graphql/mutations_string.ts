import { gql } from "@apollo/client";

export const SELECT_RESERVE_JOURNEY = gql`
    mutation SelectJourney($journey:String!, $adult:Int,$child:Int, $baby: Int ){
        selectJourney(input:{
            numberAdult:$adult,
            numberChild:$child,
            numberBaby:$baby,
            journey : $journey,
        }){
            id
            numberAdult
            numberChild
            numberBaby
            lastStep
            sessionKey
            folder
            errors{
                field
                messages
            }
        }
    }
`;