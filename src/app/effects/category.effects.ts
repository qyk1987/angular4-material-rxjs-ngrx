import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/category.action';
import { CategoryService } from '../services/category.service';
import { Category } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class CategoryEffects {
    @Effect() 
    loadCategory$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(categorys=>new actions.LoadSuccessAction(categorys))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addCategory$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(category=>{
           return  this.service$.add(category)
            .map(category=>new actions.AddSuccessAction(category))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateCategory$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((category)=>this.service$.update(category)
            .map(category=>new actions.UpdateSuccessAction(category))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteCategory$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((category)=>this.service$.del(category)
            .map(category=>new actions.DeleteSuccessAction(category))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:CategoryService
    ) {}
}