// =========---- USER-INFO-REDUCERS ----=========
// @ Brief : .....
// @ Exports : ....
//     

import { ActionType } from "../action-types/user-action-types";
import { Action, SagaProfileAction } from "../actions/user-actions";

type InfoState = {
    userGraphs: any | null,
}

const initalState : InfoState = { 
    userGraphs: null
}

type AppAction = Action | SagaProfileAction 

const userInfoReducer = (state = initalState, action : AppAction) => {
    switch(action.type) { 
        case ActionType.UPDATE_USER_GRAPHS:
            return {...state, userGraphs: action.payload}
        default: 
            return state;
    }
}

export default userInfoReducer;