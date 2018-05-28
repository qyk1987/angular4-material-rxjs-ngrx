
import { Action } from '@ngrx/store';
import {Auth, User, Duty,VerifyResult} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    LOGIN:type('[Auth] Login') ,
    LOGIN_SUCCESS:type('[Auth] Login Success'),
    LOGIN_FAIL:type('[Auth] Login Fail'),
    VERIFY:type('[Auth] Verify Code') ,
    VERIFY_SUCCESS:type('[Auth] Verify Code Success'),
    VERIFY_FAIL:type('[Auth] Verify Code Fail'),
   
    VERIFYIMG:type('[Auth] Verify imgCode') ,
    VERIFYIMG_SUCCESS:type('[Auth] Verify imgCode Success'),
    VERIFYIMG_FAIL:type('[Auth] Verify imgCode Fail'),
    REGISTER:type('[Auth] Register') ,
    REGISTER_SUCCESS:type('[Auth] Register Success'),
    REGISTER_FAIL:type('[Auth] Register Fail'),
    LOGOUT:type('[Auth] Logout'),
    LOGOUT_SUCCESS:type('[Auth] Logout SUCCESS'),
    GET_INFO:type('[Auth] Get Info'),
    GET_INFO_SUCCESS:type('[Auth] Get Info Success'),
    GET_INFO_FAIL:type('[Auth] Get Info Fail'),
    GET_CURRENT_USER:type('[Auth] Get CurrentUser') ,
    GET_CURRENT_USER_SUCCESS:type('[Auth] Get CurrentUser Success'),
    GET_CURRENT_USER_FAIL:type('[Auth] Get CurrentUser Fail'),
    RESET_PASSWORD:type('[Auth] Reset Password') ,
    RESET_PASSWORD_SUCCESS:type('[Auth] Reset Password Success'),
    RESET_PASSWORD_FAIL:type('[Auth] Reset Password Fail'),
    
    SELECT_ROLE:type('[Auth] Select Role'),
    VOID:type('[Auth] VOID'),
    CANCEL_SEND:type('[Auth] Canael Send'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoginAction implements Action {
    readonly type = ActionTypes.LOGIN;

    constructor(public payload: {email:string,password:string}) { }
}

export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: Auth) { }
}
export class LoginFailAction implements Action {
    readonly type = ActionTypes.LOGIN_FAIL;

    constructor(public payload: string) { }
}

export class VerifyAction implements Action {
    readonly type = ActionTypes.VERIFY;

    constructor(public payload:{PhoneNumber:string,SmsCode:string,type:string}) { }
}

export class VerifySuccessAction implements Action {
    readonly type = ActionTypes.VERIFY_SUCCESS;

    constructor(public payload: VerifyResult) { }
}
export class VerifyFailAction implements Action {
    readonly type = ActionTypes.VERIFY_FAIL;

    constructor(public payload: string) { }
}



export class VerifyImgAction implements Action {
    readonly type = ActionTypes.VERIFYIMG;

    constructor(public payload:{PhoneNumber:string,Key:string,Code:string,type:string}) { }
}

export class VerifyImgSuccessAction implements Action {
    readonly type = ActionTypes.VERIFYIMG_SUCCESS;

    constructor(public payload: string) { }
}
export class VerifyImgFailAction implements Action {
    readonly type = ActionTypes.VERIFYIMG_FAIL;

    constructor(public payload: string) { }
}


export class ResetPwdAction implements Action {
    readonly type = ActionTypes.RESET_PASSWORD;

    constructor(public payload:{PhoneNumber:string,token:string,Password:string}) { }
}

export class ResetPwdSuccessAction implements Action {
    readonly type = ActionTypes.RESET_PASSWORD_SUCCESS;

    constructor(public payload: boolean) { }
}
export class ResetPwdFailAction implements Action {
    readonly type = ActionTypes.RESET_PASSWORD_FAIL;

    constructor(public payload: string) { }
}

export class RegisterAction implements Action {
    readonly type = ActionTypes.REGISTER;

    constructor(public payload:User) { }
}

export class RegisterSuccessAction implements Action {
    readonly type = ActionTypes.REGISTER_SUCCESS;

    constructor(public payload: boolean) { }
}
export class RegisterFailAction implements Action {
    readonly type = ActionTypes.REGISTER_FAIL;

    constructor(public payload: string) { }
}
export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;

    constructor(public payload: string) { }
}
export class LogoutSuccessAction implements Action {
    readonly type = ActionTypes.LOGOUT_SUCCESS;

    constructor(public payload: null) { }
}
export class GetInfoAction implements Action {
    readonly type = ActionTypes.GET_INFO;

    constructor(public payload: null) { }
}
export class GetInfoSuccessAction implements Action {
    readonly type = ActionTypes.GET_INFO_SUCCESS;

    constructor(public payload: Auth) { }
}
export class GetInfoFailAction implements Action {
    readonly type = ActionTypes.GET_INFO_FAIL;
    constructor(public payload: string) { }
}

export class GetCurrentUserAction implements Action {
    readonly type = ActionTypes.GET_CURRENT_USER;

    constructor(public payload:null) { }
}

export class GetCurrentUserSuccessAction implements Action {
    readonly type = ActionTypes.GET_CURRENT_USER_SUCCESS;

    constructor(public payload: Auth) { }
}
export class GetCurrentUserFailAction implements Action {
    readonly type = ActionTypes.GET_CURRENT_USER_FAIL;
    constructor(public payload: string) { }
}



export class SelectRoleAction implements Action {
    readonly type = ActionTypes.SELECT_ROLE;

    constructor(public payload:Duty) { }
}
export class VoidAction implements Action {
    readonly type = ActionTypes.VOID;

    constructor(public payload:null) { }
}
export class CancelSendAction implements Action {
    readonly type = ActionTypes.CANCEL_SEND;

    constructor(public payload:null) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = LoginAction
                        |LoginSuccessAction
                        |LoginFailAction
                        |RegisterAction
                        |RegisterFailAction
                        |RegisterSuccessAction
                        |VerifyAction
                        |VerifyFailAction
                        |VerifySuccessAction
                        |VerifyImgAction
                        |VerifyImgSuccessAction
                        |VerifyImgFailAction
                        |ResetPwdAction
                        |ResetPwdSuccessAction
                        |ResetPwdFailAction
                        |LogoutAction
                        |GetInfoAction
                        |GetCurrentUserAction
                        |GetCurrentUserSuccessAction
                        |GetCurrentUserFailAction
                        |GetInfoSuccessAction
                        |GetInfoFailAction
                        |CancelSendAction
                        |SelectRoleAction
                        |LogoutSuccessAction
                        |VoidAction;
