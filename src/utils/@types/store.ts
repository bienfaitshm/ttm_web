
export interface ActionReducer<ActionType=string,PayloadType=any>{
    type : ActionType;
    payload: PayloadType
}