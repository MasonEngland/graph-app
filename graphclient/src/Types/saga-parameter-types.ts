import { LoginParams, RegisterParams } from "./parameter-types";
import { Auth } from '../State/action-types/saga-actions';

type SagaLoginParams = 
    { payload: LoginParams, type: Auth.LOGIN_REQUEST } 
    
type SagaRegisterParams = 
    { payload: RegisterParams, type: Auth.REGISTER_REQUEST }


export type {
    SagaLoginParams,
    SagaRegisterParams, 
}