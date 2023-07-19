
import { Action, SagaProfileAction } from "../actions/user-actions";
import { ActionType } from "../action-types/user-action-types";


type graphstate = {
    currentGraph: any | null
}

const initialState: graphstate = {
    currentGraph: null
}

type AppAction = Action | SagaProfileAction 

const updateGraphReducer = (state = initialState, action: AppAction ) => {
    switch (action.type) {
        case ActionType.UPDATE_BAR_GRAPH:
            //console.log(action.payload);
            return {...state, currentGraph: action.payload}
        default:
            return state
    }
}

export default updateGraphReducer