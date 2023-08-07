// =========---- PROFILE_ACTIONS.TS ----=========
// @ Brief : This class is meant to provide the method 
//           definitions for all internal SAGA Redux actions 
//           involving User authorization.
// @ Exports 
//     - RegisterUser
//     - LoginUser
//     - LogoutUser

import { Auth, Graph, User } from "../action-types/saga-actions";
import { LoginParams, RegisterParams } from "../../Types/parameter-types";
     
interface RegisterUser {
    type: Auth.REGISTER_REQUEST
    payload: RegisterParams
}

interface LoginUser {
    type: Auth.LOGIN_REQUEST,
    payload: LoginParams
}

interface QuickLogin {
    type: Auth.QUICKAUTH_REQUEST,
}

interface LogoutUser {
    type: Auth.LOGOUT_REQUEST,  
}

interface RetrieveUserGraphs {
    type: User.RETRIEVE_USER_INFO
}

interface UpdateCurrentGraph {
    type: Graph.UPDATE_BAR_GRAPH
}

interface SaveGraph {
    type: Graph.SAVE_GRAPH
}

interface SaveEdits {
    type: Graph.SAVE_EDITS
}

export type SagaProfileAction = (
    LoginUser     |
    QuickLogin    |
    LogoutUser    |
    RegisterUser  |
    UpdateCurrentGraph |
    RetrieveUserGraphs |
    SaveGraph |
    SaveEdits
)