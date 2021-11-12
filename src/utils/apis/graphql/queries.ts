import { useQuery } from "@apollo/client";
import {
    TOWN_STRING,JOURNEY_COMPANY_PRESENTATION_STRING, 
    DETAIL_JOURNEY, 
    DETAIL_JOURNEY_SELECTED
} from "./queries_string";

export const useSearchTown = ()=>useQuery(TOWN_STRING);
export const useGetCompanyJourneyPres = (company:any)=>useQuery(JOURNEY_COMPANY_PRESENTATION_STRING, {
    variables:{company}
});

export const useDetailJourney = (id:any)=>useQuery(DETAIL_JOURNEY, {
    variables:{id}
});

export const useDetailJourneySeleted = (id:any)=>useQuery(DETAIL_JOURNEY_SELECTED, {
    variables:{id}
});