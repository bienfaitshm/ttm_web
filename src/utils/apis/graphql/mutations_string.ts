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
      numberAdult
      numberChild
      numberBaby
      lastStep
      folder{
        number
        session
      }
      session{
        key
      }
      journey{
        journeySeats{
          edges{
            node{
              expired
              seat{
                id
                x
                y
                name
              }
              routing{
                edges{
                  node{
                    whereFrom{
                      id
                      town
                    }
                    whreTo{
                      id
                      town                      
                    }
                  }
                }
              }
            }
          }
        }
        cars{
          configCab{
            name
            devMod
            x
            y
            clipboard
            numberOfSeats
            seats{
              edges{
                cursor
                node{
                  id
                  x
                  y
                  name
                }
              }
            }
          }
        }
      }
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