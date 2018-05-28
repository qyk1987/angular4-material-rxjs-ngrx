import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/diploma.action';
import * as userActions from '../actions/user.action';
import { DiplomaService } from '../services/diploma.service';
import { Diploma } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class DiplomaEffects {
    @Effect() 
    loadDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(diplomas=>new actions.LoadSuccessAction(diplomas))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
   
    @Effect() 
    addDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(diploma=>{
           return  this.service$.add(diploma)
            .map(diploma=>new actions.AddSuccessAction(diploma))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }       
        );
    @Effect() 
    updateDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((diploma)=>this.service$.update(diploma)
            .map(diploma=>new actions.UpdateSuccessAction(diploma))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((diploma)=>this.service$.del(diploma)
            .map(diploma=>new actions.DeleteSuccessAction(diploma))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );     
    @Effect() 
    loadDiplomasByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(page=>this.service$.getByPage(page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
    );   
    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:DiplomaService
    ) {}
}