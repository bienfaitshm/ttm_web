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


export const INPUT_INFO_PASSENGER_STEP = gql`
    mutation OnReserveInfoPassengers($session:String!, $passengers : [PassengerSerializerInput]!){
  reserveInfoPassengers(input:{
    session :$session,
    passengers : $passengers
  }){
    errors{
      field
      messages
    }
    journeySelected{
      id
      lastStep
      passengers{
        edges{
          cursor
          node{
            id
            firstname
            middlename
            lastname
            typeUser
            birthDay
            gender
          }
        }
      }
    }
  }
}
`;