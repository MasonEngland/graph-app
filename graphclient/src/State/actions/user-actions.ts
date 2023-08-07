// =========---- PROFILE_ACTIONS.TS ----=========
// @ Brief : This class is meant to provide the method 
//           definitions for all internal reducer Redux actions 
//           involving User authorization.
// @ Exports 
//     - Action

import { ActionType } from "../action-types/user-action-types";
import { UserProfile } from "../../Types/state-types";     

interface UpdateUser {
    type: ActionType,
    payload: UserProfile
}

interface UpdatedUserInfo {
    type: ActionType,
    payload: any
}

interface UpdateGraph {
    type: ActionType.UPDATE_EDITING_COMPONENT,
    payload: any
}

export {SagaProfileAction} from './profile-actions'

export type Action = ( UpdateUser | UpdatedUserInfo | UpdateGraph ) 