import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/compensation.action';
import { CompensationService } from '../services/compensation.service';
import { Compensation } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class CompensationEffects {
    @Effect() 
    loadCompensation$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(compensations=>new actions.LoadSuccessAction(compensations))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addCompensation$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(compensation=>{
           return  this.service$.add(compensation)
            .map(compensation=>new actions.AddSuccessAction(compensation))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        });
    @Effect() 
    updateCompensation$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((compensation)=>this.service$.update(compensation)
            .map(compensation=>new actions.UpdateSuccessAction(compensation))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteCompensation$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((compensation)=>this.service$.del(compensation)
            .map(compensation=>new actions.DeleteSuccessAction(compensation))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:CompensationService
    ) {}
}