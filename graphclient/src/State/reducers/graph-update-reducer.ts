
import { Action, SagaProfileAction } from "../actions/user-actions";
import { ActionType } from "../action-types/user-action-types";


type graphstate = {
    currentGraph: any | null,
    currentGraphComponent: any | null,
    editingComponentType: string | null,
    editingComponent: any | null,
    graphType: string| null
}

const initialState: graphstate = {
    currentGraph: null,
    currentGraphComponent: null,
    editingComponentType: null,
    editingComponent: null,
    graphType: null
}

// This is not done need to finish later, meant to save changes to the editing components if
// another graph componenet was selected
const saveChangesToComponent = (editingComponent : any, currentGraphComponent : any) => {
    if(editingComponent === currentGraphComponent) return currentGraphComponent
    return editingComponent
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
        case ActionType.UPDATE_EDITING_COMPONENT:
            return {...state, editingComponent : action.payload}
        case ActionType.ADD_NEW_GRAPH : 
            return {...state, currentGraph : action.payload}
        default:
            return state
    }
}

export default updateGraphReducer