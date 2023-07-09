// =========---- PROFILE_ACTIONS.TS ----=========
// @ Brief : This class is meant to provide the method 
//           definitions for all internal SAGA Redux actions 
//           involving User authorization.
// @ Exports 
//     - RegisterUser
//     - LoginUser
//     - LogoutUser

import { Auth, User } from "../action-types/saga-actions";
import { LoginParams, RegisterParams } from "../../Types/parameter-types";
     
interface RegisterUser {
    type: Auth.REGISTER_REQUEST
    payload: RegisterParams
}

interface LoginUser {
    type: Auth.LOGIN_REQUEST,
    payload: LoginParams
}

interface LogoutUser {
    type: Auth.LOGOUT_REQUEST,  
}

interface RetrieveUserGraphs {
    type: User.RETRIEVE_USER_INFO
}

export type SagaProfileAction = (
    LoginUser     |
    LogoutUser    |
    RegisterUser  |
    RetrieveUserGraphs
)