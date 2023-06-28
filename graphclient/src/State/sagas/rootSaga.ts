// =========---- ROOTSAGA.TS ----=========
// @ Brief : This class is meant to provide the architecture
//           for the ALL sagas within the app. This is done by
//           merging all existing sagas together, into the 
//           root saga for the store to use. 
// @ Exports 
//     - rootSaga

import {all, fork} from 'redux-saga/effects'
import authSaga from './saga'

export function* rootSaga() {
    yield all([fork(authSaga)])
}