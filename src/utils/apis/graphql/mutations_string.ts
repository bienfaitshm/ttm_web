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
          numberAdult
          numberChild
          numberBaby
          lastStep
          session {
          key
          }
          passengers{
            edges{
                node{
                id
                firstname
                middlename
                lastname
                birthDay
                gender
                typeUser
                dateCreated
                }
            }
          }
          journey {
              id
              price
              numJourney
              devise
              routeNames
              journeyRoutes {
                  edges {
                  node {
                      id
                      price
                      devise
                      journeySeatsReserved {
                      edges {
                          node {
                          expired
                          seat {
                              id
                          }
                          passenger {
                              id
                          }
                          }
                      }
                      }
                      route {
                      whereFrom {
                          id
                          town
                      }
                      whreTo {
                          id
                          town
                      }
                      }
                  }
                  }
              }
              cars {
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
                          type
                          }
                      }
                      }
                  }
              }
          }
        }
      
      }
    }
`;