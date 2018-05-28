import { Auth, Duty } from "../domain";
import * as actions from '../actions/auth.action';
import { getError } from "app/utils/reduer.util";


export const initialState: Auth = {
    isLogin:false,
    currentDutyId:null,
    dutys:{},
    access_token:null,
    expires_in:null,
    token_type:null,
    userName:null,
    user:null,
    userId:null,
    text:null,
    error:false,
    issend:false,


};


const setToken=(state,action)=>{
    const data=action.payload;
    
    return {... state,error:false,test:null,access_token:data.access_token,token_type:data.token_type,userName:data.userName};
}
const setNumber=(state,action)=>{
    const data=action.payload;
    
    return {... state,userName:data.number,error:false,access_token:data.token };
}
const setSend=(state,action)=>{
    const data=action.payload;
    
    return {... state,userName:data,issend:true,error:false};
}
const canaelSend=(state,action)=>{
    const data=action.payload;
    
    return {... state,issend:false};
}
const setLoginError=(state,action)=>{
    const data=action.payload;
    const error=JSON.parse(data);
    const message=JSON.parse(error._body);
    return {... state,error:true,text:message.error_description};
}

const setError=(state,action)=>{
    const data=action.payload;
    const info=getError(data);
    return {... state,error:true,text:info.error_description};
}
const setDuty=(state,action)=>{
    const data=action.payload;
    
    return {... state,userId:data.userId,user:data.user,currentDutyId:data.currentDutyId,isLogin:true,dutys:data.dutys};
}
export function reducer(state = initialState, action:actions.Actions ): Auth {
    switch (action.type) {
        
        // //case actions.ActionTypes.GET_TOKEN_SUCCESS:
        // case actions.ActionTypes.REGISTER_SUCCESS:{
        //     return {...<Auth>action.payload};
        // }
        case actions.ActionTypes.LOGIN_SUCCESS:{
            return setToken(state,action);
        }
        case actions.ActionTypes.VERIFY_SUCCESS:{
            return setNumber(state,action);
        }
        case actions.ActionTypes.VERIFYIMG_SUCCESS:{
            return setSend(state,action);
        }
        case actions.ActionTypes.CANCEL_SEND:{
            return canaelSend(state,action);
        }
        case actions.ActionTypes.LOGIN_FAIL:{
            return setLoginError(state,action);
        }
        case actions.ActionTypes.RESET_PASSWORD_FAIL:
        case actions.ActionTypes.VERIFYIMG_FAIL:
        case actions.ActionTypes.VERIFY_FAIL:{
            return setError(state,action);
        }
        case actions.ActionTypes.GET_CURRENT_USER_SUCCESS:{
            return setDuty(state,action);
        }
        case actions.ActionTypes.REGISTER_SUCCESS:
        case actions.ActionTypes.REGISTER_FAIL:{
            return initialState;
        }
        case actions.ActionTypes.SELECT_ROLE:{
            return {...state,currentDutyId:(<Duty>action.payload).Id};
        }
        default: {
            return state;
        }
    }
}
export const getAuth = (state: Auth) => state;