import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/product.action';
import { ProductService } from '../services/product.service';
import { Product } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class ProductEffects {
    @Effect() 
    loadProduct$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(products=>new actions.LoadSuccessAction(products))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadProductBySubject$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_SUBJECT)
        .map(toPayload)
        .switchMap(id=>this.service$.getBySubject(id)
            .map(products=>new actions.LoadBySubjectSuccessAction(products))
            .catch(err=>Observable.of(new actions.LoadBySubjectFailAction(JSON.stringify(err))))
        );
     @Effect() 
    loadProductByCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_CAMPUS)
        .map(toPayload)
        .switchMap(id=>this.service$.getWithCouponByCampus(id)
            .map(products=>new actions.LoadWithCouponByCampusSuccessAction(products))
            .catch(err=>Observable.of(new actions.LoadWithCouponByCampusFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addProduct$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(product=>{
           return  this.service$.add(product)
            .map(product=>new actions.AddSuccessAction(product))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateProduct$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((product)=>this.service$.update(product)
            .map(product=>new actions.UpdateSuccessAction(product))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteProduct$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((product)=>this.service$.del(product)
            .map(product=>new actions.DeleteSuccessAction(product))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    loadProductsByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(p=>this.service$.getByPage(p.level,p.id,p.page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:ProductService
    ) {}
}