import { useMutation } from "@apollo/client";
import { 
    SELECT_RESERVE_JOURNEY, 
    VALIDATION_PAYEMENT_MUTAION,
    DETAIL_INPUT_INFOS,
    INPUT_INFO_PASSENGER_STEP,
} from "./mutations_string";

const useBaseMuation = (gql:any)=>useMutation(gql);
export const useSelectJourney = ()=>useBaseMuation(SELECT_RESERVE_JOURNEY)
export const usePassengerInfoStepMutation = ()=>useBaseMuation(INPUT_INFO_PASSENGER_STEP)
export const useDetailInfoInputStepMutation = ()=>useBaseMuation(DETAIL_INPUT_INFOS)
export const useValidationInputStepMutation = ()=>useBaseMuation(VALIDATION_PAYEMENT_MUTAION)