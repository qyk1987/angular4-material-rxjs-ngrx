import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/coupon.action';
import { CouponService } from '../services/coupon.service';
import { Coupon } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class CouponEffects {
    @Effect() 
    loadCoupon$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(coupons=>new actions.LoadSuccessAction(coupons))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadByCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_CAMPUS)
        .map(toPayload)
        .switchMap(id=>this.service$.getByCampus(id)
            .map(coupons=>new actions.LoadByCampusSuccessAction(coupons))
            .catch(err=>Observable.of(new actions.LoadByCampusFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addCoupon$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(coupon=>{
           return  this.service$.add(coupon)
            .map(coupon=>new actions.AddSuccessAction(coupon))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateCoupon$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((coupon)=>this.service$.update(coupon)
            .map(coupon=>new actions.UpdateSuccessAction(coupon))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteCoupon$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((coupon)=>this.service$.del(coupon)
            .map(coupon=>new actions.DeleteSuccessAction(coupon))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    loadCouponsByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(p=>this.service$.getByPage(p.state,p.key,p.page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
   
    @Effect() 
    invateProducts$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.INVITE_PRODUCTS)
        .map(toPayload)
        .switchMap(p=>this.service$.inviteProducts(p)
            .map(result=>new actions.InviteProductsSuccessAction(result))
            .catch(err=>Observable.of(new actions.InviteProductsFailAction(JSON.stringify(err))))
        );
    @Effect() 
    invateCampuses$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.INVITE_CAMPUS)
        .map(toPayload)
        .switchMap(p=>this.service$.inviteCampuses(p)
            .map(result=>new actions.InviteCampusesSuccessAction(result))
            .catch(err=>Observable.of(new actions.InviteCampusesFailAction(JSON.stringify(err))))
        );
    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:CouponService
    ) {}
}