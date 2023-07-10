import { Auth, User } from '../action-types/saga-actions';
import { call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../action-types/user-action-types'

import * as Params from '../../Types/saga-parameter-types'

import axios from 'axios'

let currentUser = ""
let token       = ""
const APIUrl = "http://localhost:10000/"

// auth saga forks will get merged into the root saga
function* authSaga() {
    yield takeEvery(Auth.LOGIN_REQUEST,  loginSaga)
    yield takeEvery(Auth.LOGOUT_REQUEST, logoutSaga)
    yield takeEvery(Auth.REGISTER_REQUEST, registerAccountSaga)
    yield takeEvery(User.RETRIEVE_USER_INFO, retrieveGraphsSaga)
}

export function* retrieveGraphsSaga({payload, type} : any) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const res: { data : any } = yield axios.get(`${APIUrl}graphs/${currentUser}`, config)
        yield put({type: ActionType.UPDATE_USER_GRAPHS, payload: res.data})
        console.log(res.data);
    }
    catch(e){}
}

export function* loginSaga({payload, type} : Params.SagaLoginParams) {
    try {
        const res: { data : any } = yield axios.post(`${APIUrl}accounts/verify`, payload)
        yield put({ type: ActionType.UPDATE_USER, payload: res.data})
        currentUser = res.data.id;
        token       = res.data.token;
        console.log(res.data);
    }
    catch(e) {
        //todo: here we would put login failed   yield put(  )
    }
} 

export function* registerAccountSaga({payload, type} : Params.SagaRegisterParams) {
    try {
        const res: { data : any } = yield axios.post(`${APIUrl}accounts/create`, payload)
        console.log(res.data);
    }
    catch(e) {
        //todo: here we would put register failed   yield put(  )
    }
}

export function* logoutSaga() {
    try {
        yield call( async ()=> { axios.post(`${APIUrl}/auth/logout`) }) 
        yield put({type : ActionType.UPDATE_USER, payload: null})
    }
    catch(e) {
        //todo: here we would put register failed     yield put(  )
    }
}

export default authSaga