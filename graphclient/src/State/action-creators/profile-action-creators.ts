// =========---- ACTION-CREATORS.TS ----=========
// @ Brief : This class is meant to provide importable functions 
//     to other components to interact with the Redux store and 
//     execute API calls via Redux Saga. Related to User Profile
//     data :
// @ Exports 
//     - User Auth : loginUser, logoutUser, regUser

import { LoginParams, RegisterParams } from "../../Types/parameter-types";
import { Auth, Graph, User } from '../action-types/saga-actions'
import { ActionType } from "../action-types/user-action-types";
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

export const getUserGraphs = () => {
    store.dispatch({type: User.RETRIEVE_USER_INFO})
}


export const saveNewGraph = (graphtype:"bargraph" | "linegraph" | "venndiagram", payload: any) => {
    store.dispatch({type: Graph.SAVE_GRAPH, payload, graphtype});
}


export const updateGraphComponent = (payload: any) => {
    store.dispatch({type: ActionType.UPDATE_GRAPH_COMPONENT, payload})
}

// this saves any change made to an existing graph in the database
// has nothing to do with state
export const SaveEdits = (payload: any, graphID: string) => {
    store.dispatch({type: Graph.SAVE_EDITS, payload, graphID})
}

//! Useless?
// these will be commented out to save the garbage collector
/*export const updateUserGraph = (payload: any) => {
    store.dispatch({type: ActionType.UPDATE_USER_GRAPH, payload})
}


export const updateGraph = (graphtype: "bargraph" | "linegraph"| "venndiagram", payload: any) => {
    switch (graphtype) {
        case "bargraph":
            store.dispatch({type: ActionType.UPDATE_BAR_GRAPH, payload});
            break;
        default:
            console.error("updateGraph is under construction: type of this graph is not supported yet");
    }
}*/
