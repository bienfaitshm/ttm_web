import { combineReducers } from "redux";
import {steperReservation } from "./steperReservation";
import { tmpData} from "./tmpData"

const reducers = combineReducers({
    steperReservation,
    tmpData
});

export default reducers;
