import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/auth.action';
import * as prdActions from '../actions/product.action';
import * as schActions from '../actions/school.action';
import * as dipActions from '../actions/diploma.action';
import * as catActions from '../actions/category.action';
import * as couActions from '../actions/coupon.action';
import * as camActions from '../actions/campus.action';
import * as roleActions from '../actions/role.action';
import * as postActions from '../actions/post.action';
import { AuthService } from '../services/auth.service';
import * as serActions from '../actions/service.action';
import {go} from '@ngrx/router-store';
import {of} from 'rxjs/observable/of';
@Injectable()
export class AuthEffects {
    @Effect() 
    login$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(({email,password})=>this.service$.login(email,password)
            .map(auth=>new actions.LoginSuccessAction(auth))
            .catch(err=>Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
        );
    @Effect() 
    register$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.REGISTER)
        .map(toPayload)
        .switchMap(data=>this.service$.register(data)
            .map(auth=>new actions.RegisterSuccessAction(auth))
            .catch(err=>Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
        );
    @Effect() 
    resetPwd$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.RESET_PASSWORD)
        .map(toPayload)
        .switchMap(data=>this.service$.resetPwd(data.PhoneNumber,data.token,data.Password)
            .map(auth=>new actions.ResetPwdSuccessAction(auth))
            .catch(err=>Observable.of(new actions.ResetPwdFailAction(JSON.stringify(err))))
        );
    @Effect() 
    verify$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.VERIFY)
        .map(toPayload)
        .switchMap(data=>this.service$.verifySms(data.PhoneNumber,data.SmsCode,data.type)
            .map(auth=>new actions.VerifySuccessAction(auth))
            .catch(err=>Observable.of(new actions.VerifyFailAction(JSON.stringify(err))))
        );
 
    @Effect() 
    verifyimg$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.VERIFYIMG)
        .map(toPayload)
        .switchMap(data=>this.service$.verifyImg(data.PhoneNumber,data.Key,data.Code,data.type)
            .map(auth=>new actions.VerifyImgSuccessAction(auth))
            .catch(err=>Observable.of(new actions.VerifyImgFailAction(JSON.stringify(err))))
        );
    @Effect() 
    logout$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOGOUT)
        .map(_=>go(['/']));
   
    @Effect() 
    toregister$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.VERIFY_SUCCESS)
        .map(toPayload)
        .map(data=>{
            const uri="/"+data.type;
            return go([uri]);
        });
       // .map(_=>new actions.LogoutSuccessAction(null));
    @Effect() 
    loginsucess$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOGIN_SUCCESS)
        .map(auth=>new actions.GetCurrentUserAction(null));
        // .map(toPayload)
        // //.map(_=> go(['/student'])); 
        // .map(auth=>{
        //     if(auth.text==="success"){
        //         return  go(['/home']); //return new actions.GetCurrentUserAction(null);
        //     }else{
        //         return new actions.ShowErrorAction(auth);
        //     }
            
        // }
        // );
     @Effect() 
    direct$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS)
        .map(_=>go(['/home']));
     @Effect() 
     getcurrentuser$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.GET_CURRENT_USER)
        .map(toPayload)
        .switchMap(_=>this.service$.getCurrentUser()
            .map(auth=>new actions.GetCurrentUserSuccessAction(auth))
            .catch(err=>Observable.of(new actions.GetCurrentUserFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadProducts$: Observable<Action> = this.actions$.//登录成功后导入所有
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>{ 
                if(auth.dutys[auth.currentDutyId].CampusId!==null){
                    return new prdActions.LoadWithCouponByCampusAction(auth.dutys[auth.currentDutyId].CampusId);
                    
                }else{
                  return  new prdActions.LoadAction(null);
                }
        });

    @Effect() 
    loadSchools$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>new schActions.LoadAction(null));
    @Effect() 
    loadRoles$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>new roleActions.LoadAction(null));
    @Effect() 
    loadPosts$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>new postActions.LoadAction(null));
     @Effect() 
    loadDiplomas$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>new dipActions.LoadAction(null));
    @Effect() 
    loadCategories$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>new catActions.LoadAction(null));
    @Effect() 
    loadCampus$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=> new camActions.LoadAction(null));
     @Effect() 
    loadService$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=> new serActions.LoadAction(null));
    @Effect() 
    loadCoupons$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.GET_CURRENT_USER_SUCCESS) 
        .map(toPayload)
        .map(auth=>{           
                if(auth.dutys[auth.currentDutyId].CampusId!==null){
                    return new couActions.LoadByCampusAction(auth.dutys[auth.currentDutyId].CampusId)
                    
                }else{
                    return new actions.VoidAction(null);
                }
        });
    @Effect() 
    registerAndNavigate$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.REGISTER_SUCCESS)
        .map(_=> go(['/login']));
    @Effect() 
    resetAndNavigate$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.RESET_PASSWORD_SUCCESS)
        .map(_=> go(['/login']));
    @Effect() 
    loadCouponsByRole$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.SELECT_ROLE) 
        .map(toPayload)
        .map(duty=>{
            if(duty.CampusId!==null){
               return new couActions.LoadByCampusAction(duty.CampusId)
            }else{
                return new actions.VoidAction(null);
            }
        });
    @Effect() 
    loadProductsByRole$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.SELECT_ROLE) 
        .map(toPayload)
        .map(duty=>{
            if(duty.CampusId!==null){
                //console.log(duty.CampusId);
               return new prdActions.LoadWithCouponByCampusAction(duty.CampusId);
            }else{
                return new actions.VoidAction(null);
            }
        });
    @Effect() 
    gohome$: Observable<Action> = this.actions$.//登录成功后导入所有的基础数据
        ofType(actions.ActionTypes.SELECT_ROLE) 
        .map(toPayload)
        .map(_=>go(['/home']));
    constructor(
        private actions$: Actions,
        private service$:AuthService
    ) {}
}