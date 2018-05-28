import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/order.action';
import * as cartActions from '../actions/cart.action';
import { OrderService } from '../services/order.service';
import { Order } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
import { CompensationService } from '../services/compensation.service';
import 'rxjs/add/observable/combineLatest';
@Injectable()
export class OrderEffects {
    @Effect() 
    loadOrder$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(orders=>new actions.LoadSuccessAction(orders))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadOrderByStudent$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_Student)
        .map(toPayload)
        .switchMap(id=>this.service$.getByStudent(id)
            .map(orders=>new actions.LoadByStudentSuccessAction(orders))
            .catch(err=>Observable.of(new actions.LoadByStudentFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadOrderByPost$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_POST)
        .map(toPayload)
        .switchMap(p=>this.service$.getByPost(p.postid,p.state,p.key,p.page)
            .map(orders=>new actions.LoadByPostSuccessAction(orders))
            .catch(err=>Observable.of(new actions.LoadByPostFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadOrderByKey$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.SEARCH_LIKE)
        .map(toPayload)
        .switchMap(p=>this.service$.getByKey(p.postid,p.key)
            .map(orders=>new actions.SearchLikeSuccessAction(orders))
            .catch(err=>Observable.of(new actions.SearchLikeFailAction(JSON.stringify(err))))
        );

    @Effect() 
    checkCart$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_Student_SUCCESS)
        .map(toPayload=>new actions.CheckCartAction(toPayload.payload));
        
    @Effect() 
    addOrder$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(order=>{
           return  this.service$.add(order)
            .map(order=>new actions.AddSuccessAction(order))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    addBatchOrders$: Observable<Action> = this.actions$.
        ofType(cartActions.ActionTypes.SAVE_ORDERS)
        .map(toPayload)
        .switchMap(orders=>{
           return  this.service$.addBatch(orders)
            .map(foo=>new cartActions.SaveOrdersSuccessAction(foo))
            .catch(err=>Observable.of(new cartActions.SaveOrdersFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateOrder$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((order)=>this.service$.update(order)
            .map(order=>new actions.UpdateSuccessAction(order))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );
     @Effect() 
    updateOrderState$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDAT_STATE)
        .map(toPayload)
        .switchMap((order)=>this.service$.updateState(order)
            .map(order=>new actions.UpdateStateSuccessAction(order))
            .catch(err=>Observable.of(new actions.UpdateStateFailAction(JSON.stringify(err))))            
        );      
    @Effect() 
    deleteOrder$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((order)=>this.service$.del(order)
            .map(order=>new actions.DeleteSuccessAction(order))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );
    @Effect() 
    addCOMPENDATION$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD_COMPENSATION)
        .map(toPayload)
        .switchMap((com)=>this.comService$.add(com)
            .map(order=>new actions.AddCompensationSuccessAction(order))
            .catch(err=>Observable.of(new actions.AddCompensationFailAction(JSON.stringify(err))))            
        );   
            
    @Effect() 
    updateCompensation$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE_COMPENSATION)
        .map(toPayload)
        .switchMap((order)=>this.comService$.update(order)
            .map(order=>new actions.UpdateCompensationSuccessAction(order))
            .catch(err=>Observable.of(new actions.UpdateCompensationFailAction(JSON.stringify(err))))            
        );   

      @Effect() 
    deleteCompensation$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE_COMPENSATION)
        .map(toPayload)
        .switchMap((order)=>this.comService$.del(order)
            .map(order=>new actions.DeleteCompensationSuccessAction(order))
            .catch(err=>Observable.of(new actions.DeleteCompensationFailAction(JSON.stringify(err))))            
        );         
     @Effect() 
    reload1$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE_COMPENSATION_SUCCESS )
        .withLatestFrom(this.store$.select(fromRoot.getOrderState))
        .withLatestFrom(this.store$.select(fromRoot.getSelectedPost))
        .withLatestFrom(this.store$.select(fromRoot.getPage))
        .map(data=>new actions.LoadByPostAction({postid:data["0"]["1"].Id,state:data["0"]["0"]["1"].selectedState,key:data["0"]["0"]["1"].key,page:data["1"]}));  
    @Effect() 
    reload2$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD_COMPENSATION_SUCCESS)
        .withLatestFrom(this.store$.select(fromRoot.getOrderState))
        .withLatestFrom(this.store$.select(fromRoot.getSelectedPost))
        .withLatestFrom(this.store$.select(fromRoot.getPage))
        .map(data=>new actions.LoadByPostAction({postid:data["0"]["1"].Id,state:data["0"]["0"]["1"].selectedState,key:data["0"]["0"]["1"].key,page:data["1"]}));  
    @Effect() 
    reload3$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE_SUCCESS)
        .withLatestFrom(this.store$.select(fromRoot.getOrderState))
        .withLatestFrom(this.store$.select(fromRoot.getSelectedPost))
        .withLatestFrom(this.store$.select(fromRoot.getPage))
        .map(data=>new actions.LoadByPostAction({postid:data["0"]["1"].Id,state:data["0"]["0"]["1"].selectedState,key:data["0"]["0"]["1"].key,page:data["1"]}));  
    @Effect() 
    reload4$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE_STATE_SUCCESS)
        .withLatestFrom(this.store$.select(fromRoot.getOrderState))
        .withLatestFrom(this.store$.select(fromRoot.getSelectedPost))
        .withLatestFrom(this.store$.select(fromRoot.getPage))
        .map(data=>new actions.LoadByPostAction({postid:data["0"]["1"].Id,state:data["0"]["0"]["1"].selectedState,key:data["0"]["0"]["1"].key,page:data["1"]}));  
   
    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:OrderService,
        private comService$:CompensationService
    ) {}
}