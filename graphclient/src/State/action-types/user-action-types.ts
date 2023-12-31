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

    UPDATE_GRAPH_COMPONENT   = "UPDATE_GRAPH",
    UPDATE_EDITING_COMPONENT = "UPDATE_EDITING_COMPONENT",
    UPDATE_USER_GRAPH = "UPDATE_USER_GRAPH",

    UPDATE_BAR_GRAPH = "UPDATE_BAR_GRAPH",
    ADD_NEW_GRAPH = "ADD_NEW_GRAPH",
    SAVE_GRAPH = "SAVE_GRAPHS",
    SAVE_EDITS = "SAVE_EDITS"
}
