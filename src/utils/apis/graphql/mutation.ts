import { useMutation } from "@apollo/client";
import { SELECT_RESERVE_JOURNEY } from "./mutations_string";

const useBaseMuation = (gql:any)=>useMutation(gql);
export const useSelectJourney = ()=>useBaseMuation(SELECT_RESERVE_JOURNEY)