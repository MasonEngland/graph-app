// =========---- ACTION-CREATORS.TS ----=========
// @ Brief : This class is meant to provide importable functions 
//     to other components to interact with the Redux store and 
//     execute API calls via Redux Saga. Related to User Profile
//     data :
// @ Exports 
//     - User Auth : loginUser, logoutUser, regUser

import { LoginParams, RegisterParams } from "../../Types/parameter-types";
import { Auth } from '../action-types/saga-actions'
import store from '../store'

// ## ------------- USER ------------- ##
// ======================================

export const logoutUser = () => {
    store.dispatch({type: Auth.LOGOUT_REQUEST})
}

export const loginUser = (payload: LoginParams) => {
    store.dispatch({type: Auth.LOGIN_REQUEST, payload})
}

export const regUser = (payload: RegisterParams) => {
    store.dispatch({type: Auth.REGISTER_REQUEST, payload})
}