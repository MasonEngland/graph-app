// =========---- SAGA-ACTIONS.TS ----=========
// @ Brief : This class is meant to provide defined types 
//           which are meant to describe and initiate an 
//           action in the Saga reducer.
//    
// @ Exports 
//     - User: Login, Logout, and Register requests

export enum Auth {
    LOGIN_REQUEST    = "LOGIN_REQUEST",
    LOGOUT_REQUEST   = "LOGOUT_REQUEST",
    REGISTER_REQUEST = "REGISTER_REQUEST",
}

export enum User {
    RETRIEVE_USER_INFO = "RETRIEVE_USER_INFO",
    SAVE_USER_INFO     = "SAVE_USER_INFO"
}