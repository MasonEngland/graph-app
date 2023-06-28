import { Auth } from '../action-types/saga-actions';
import { call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../action-types/user-action-types'

import * as Params from '../../Types/saga-parameter-types'

import axios from 'axios'

let currentUser = ""
const APIUrl = "http://localhost:????/api"

function* authSaga() {
    yield takeEvery(Auth.LOGIN_REQUEST,  loginSaga)
    yield takeEvery(Auth.LOGOUT_REQUEST, logoutSaga)
    yield takeEvery(Auth.REGISTER_REQUEST, registerAccountSaga)
}

export function* loginSaga({payload, type} : Params.SagaLoginParams) {
    try {
        const res: { data : any } = yield axios.post(`${APIUrl}/auth/login`, payload)
        yield put({ type: ActionType.UPDATE_USER, payload: res.data})
        currentUser = res.data.userName;
    }
    catch(e) {
        // here we would put login failed   yield put(  )
    }
} 

export function* registerAccountSaga({payload, type} : Params.SagaRegisterParams) {
    try {
        const res: { data : any } = yield axios.post(`${APIUrl}/auth/createUser`, payload)
    }
    catch(e) {
        // here we would put register failed   yield put(  )
    }
}

export function* logoutSaga() {
    try {
        yield call( async ()=> { axios.post(`${APIUrl}/auth/logout`) }) 
        yield put({type : ActionType.UPDATE_USER, payload: null})
    }
    catch(e) {
        // here we would put register failed     yield put(  )
    }
}

export default authSaga