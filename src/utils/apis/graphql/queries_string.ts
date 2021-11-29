import { gql } from "@apollo/client";

export const TOWN_STRING = gql`
    query GetTown($name : String){
        coverCities(town_Istartswith:$name){
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges{
                node{
                    id
                    dateCreated
                    town
                    code
                    latitude
                    longitude
                }
                cursor
            }
        }
    }
`;

export const DETAIL_JOURNEY = gql`
    query DetailJourney($id:ID!){
        journey(id:$id){
            id
            dateCreated
            numJourney
            price
            devise
            dateDeparture
            dateReturn
            hoursReturn
            hoursDeparture
            isDirect
            exprired
            numberOfPlacesReserved
            routeNames
            trajets{
                label
                value
            }
            routes{
                edges{
                    node{
                    whereFrom{
                        town
                        code
                    }
                    whereTo{
                        town
                        code
                    }
                    }
                }
            }
            cars{
                codeAppareil
                configCab{
                    numberOfSeats
                }
            }
        }
    }
`;

export const DETAIL_JOURNEY_SELECTED = gql`
    query DetailJourneySelected($id:ID!){
        journeySelected(id:$id){
            id
            numberAdult
            numberChild
            numberBaby
            lastStep
            session {
                key
            }
            payment{
                id
                provider
                confirmed
                costTotal
                datePayment
            }
            otherInfo{
                id
                firstname
                middlename
                lastname
                email
                numTelEmergency
                pieceId
                numPieceId
                adressFrom
                adressTo
                birthDay
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
                trajets{
                    label
                    value
                }
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
                            id
                            whereFrom {
                                id
                                town
                            }
                            whereTo {
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
`;


export const JOURNEY_COMPANY_PRESENTATION_STRING = gql`
    query getJourneyHomePresentationCompany($company:Float){
        journies(company_Id:$company){
            pageInfo{
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges{
                cursor
                node{
                    id
                    numJourney
                    price
                    devise
                    dateReturn
                    dateDeparture
                    hoursDeparture
                    hoursReturn
                    routeNames
                    cars{
                        codeAppareil
                        immatriculation
                        typeAppareil
                    }
                    company{
                        id
                        nom
                        code
                    }
                    
                }
            }
        }
    }
`;
