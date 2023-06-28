// =========---- STORE.TS ----=========
// @ Brief : This class is meant to provide the architecture
//           for the authorization Redcuder. Such includes
//           logging in, logging out the user and saving the
//           updated user in the store.
// @ Exports 
//     - authReducer

import { ActionType } from "../action-types/user-action-types";
import { Action, SagaProfileAction } from "../actions/user-actions";
import { UserProfile } from "../../Types/state-types";

type AuthState = {
    currentUser: UserProfile | null,
}

const initalState : AuthState = { 
    currentUser: null
}

type AppAction = Action | SagaProfileAction 

const authReducer = (state = initalState, action : AppAction) => {
    switch(action.type) {
        // --- USER
        case ActionType.UPDATE_USER:
            return {...state, currentUser: action.payload}  
        default: 
            return state;
    }
}

export default authReducer;