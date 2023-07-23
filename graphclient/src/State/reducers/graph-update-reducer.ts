
import { Action, SagaProfileAction } from "../actions/user-actions";
import { ActionType } from "../action-types/user-action-types";


type graphstate = {
    currentGraph: any | null,
    currentGraphComponent: any | null,
    graphType: string| null
}

const initialState: graphstate = {
    currentGraph: null,
    currentGraphComponent: null,
    graphType: null
}

type AppAction = Action | SagaProfileAction 

const updateGraphReducer = (state = initialState, action: AppAction ) => {
    switch (action.type) {
        case ActionType.UPDATE_BAR_GRAPH:
            //console.log(action.payload);
            return {...state, currentGraph: action.payload, graphType: "bargraph"};
        case ActionType.UPDATE_USER_GRAPH:
            return {...state, currentGraph: action.payload}
        case ActionType.UPDATE_GRAPH_COMPONENT: 
            return {...state, currentGraphComponent : action.payload}
        default:
            return state
    }
}

export default updateGraphReducer