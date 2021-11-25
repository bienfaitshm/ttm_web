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
            routes{
                edges{
                    node{
                    whereFrom{
                        town
                        code
                    }
                    whreTo{
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
                id
                configCab {
                id
                seats {
                    edges {
                    node {
                        id
                        name
                        x
                        y
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
