import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/receipt.action';
import { ReceiptService } from '../services/receipt.service';
import { Receipt } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class ReceiptEffects {
    @Effect() 
    loadReceipt$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(receipts=>new actions.LoadSuccessAction(receipts))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadReceiptByPost$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_POST)
        .map(toPayload)
        .switchMap(p=>this.service$.getByPost(p.postid,p.state,p.key,p.page)
            .map(orders=>new actions.LoadByPostSuccessAction(orders))
            .catch(err=>Observable.of(new actions.LoadByPostFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addReceipt$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(receipt=>{
           return  this.service$.add(receipt)
            .map(receipt=>new actions.AddSuccessAction(receipt))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateReceipt$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((receipt)=>this.service$.update(receipt)
            .map(receipt=>new actions.UpdateSuccessAction(receipt))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );
    @Effect() 
    remindReceipt$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.REMIND)
        .map(toPayload)
        .switchMap(receipt=>this.service$.Remind(receipt)
            .map(receipt=>new actions.RemindSuccessAction(receipt))
            .catch(err=>Observable.of(new actions.RemindFailAction(JSON.stringify(err))))            
        );      
    @Effect() 
    deleteReceipt$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((receipt)=>this.service$.del(receipt)
            .map(receipt=>new actions.DeleteSuccessAction(receipt))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:ReceiptService
    ) {}
}