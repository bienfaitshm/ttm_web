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

export const VALIDATION_PAYEMENT_MUTAION = gql`
  mutation ValidePayement(
      $session :String!,
      $provider: String!
      $confirmed: Boolean!
      $costTotal: String!
      $datePayment: DateTime!
    ) {
      validePayement(
        input: {
          session:$session,
          provider: $provider
          confirmed: $confirmed
          costTotal: $costTotal
          datePayment: $datePayment
        }
      ) {
        id
        provider
        confirmed
        costTotal
        datePayment
        errors {
          field
          messages
        }
      }
  }
`;

export const DETAIL_INPUT_INFOS = gql`
  mutation DetailInfosMuation(
    $session:String!,
    $firstname: String!,
    $middlename: String!,
    $lastname: String!,
    $email: String!,
    $numTelEmergency: String!,
    $pieceId: String!,
    $numTel:String!,
    $numPieceId: String!,
    $adressFrom: String!,
    $adressTo: String!,
    $degreParent:String!,
    $birthDay: Date!,
    $id: Int
  ) {
    infoDetails(
      input: {
        session:$session,
        firstname: $firstname,
        middlename: $middlename,
        lastname: $lastname,
        email: $email,
        numTel : $numTel,
        numTelEmergency: $numTelEmergency,
        pieceId: $pieceId,
        numPieceId: $numPieceId,
        degreParent :$degreParent,
        adressFrom: $adressFrom,
        adressTo: $adressTo,
        birthDay: $birthDay,
        id: $id
      }
    ) {
      id
      firstname
      middlename
      lastname
      degreParent
      email
      numTel
      numTelEmergency
      pieceId
      numPieceId
      adressFrom
      adressTo
      birthDay
      dateCreated
      errors {
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