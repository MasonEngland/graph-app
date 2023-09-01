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

// Add a new graph to the State when a user creates a new graph
const addNewGraph = (newGraph : any, graphs : any) => {
    console.log(newGraph);
    // Get graph type and remove spaces
    let graphType = ( newGraph.graphType as string ).replace(" ", "");
    // Lower case the first letter and add 's'
    graphType = graphType[0].toLocaleLowerCase() + graphType.substring(1) + 's'
    // Now graph type is in format to access from userGraphs
    console.log(graphs);
    const updatedGraphs = graphs[graphType]
    console.log(updatedGraphs);
    updatedGraphs.push(newGraph)
    graphs[graphType] = updatedGraphs
    return {...graphs}
}


const userInfoReducer = (state = initalState, action : AppAction) => {
    switch(action.type) { 
        case ActionType.UPDATE_USER_GRAPHS:
            return {...state, userGraphs: action.payload}
        case ActionType.ADD_NEW_GRAPH:
            return { userGraphs : addNewGraph(action.payload, state.userGraphs)}
        default: 
            return state;
    }
}

export default userInfoReducer;