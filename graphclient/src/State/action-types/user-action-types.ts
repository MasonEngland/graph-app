// =========---- USER-ACTIONS-TYPES.TS ----=========
// @ Brief : This class is meant to provide defined types which 
//           are meant to describe and initiate an action in the
//           Auth reducer
//    
// @ Exports 
//     - User: Login, Logout, and Register requests

export enum ActionType {
    UPDATE_USER = "UPDATE_USER",
    LOGIN  = "LOGIN",
    LOGOUT = "LOGOUT",

    UPDATE_USER_GRAPHS = "UPDATE_USER_GRAPHS",

    UPDATE_BAR_GRAPH = "UPDATE_BAR_GRAPH",
    SAVE_GRAPH = "SAVE_GRAPHS"
}
