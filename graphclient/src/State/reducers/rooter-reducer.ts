// =========---- ROOT_REDUCER.TS ----=========
// @ Brief : This class is meant to provide the architecture
//           for the ALL Redcuders within the app. This is done 
//           by merging all existing reducers together, into the 
//           root reducer for the store to use. 
// @ Exports 
//     - reducers, State

import { combineReducers } from "redux";
import authReducer from "./auth-reducers"
import userInfoReducer from "./user-info-reducer";

export const reducers = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer
});

export type State = ReturnType<typeof reducers>