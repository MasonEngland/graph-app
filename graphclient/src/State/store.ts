// =========---- STORE.TS ----=========
// @ Brief : This class is meant to provide the architecture
//           for the store, the main central state of the app.
//           Such includes adding all reducers and sagas to 
//           the store.
// @ Exports 
//     - store

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducers } from './reducers/rooter-reducer'
import { rootSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

export default store;