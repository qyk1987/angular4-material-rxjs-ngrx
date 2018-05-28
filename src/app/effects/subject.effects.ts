import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/subject.action';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class SubjectEffects {
    @Effect() 
    loadSubject$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(subjects=>new actions.LoadSuccessAction(subjects))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadSubjectByDistrict$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_CATEGORY)
        .map(toPayload)
        .switchMap(id=>this.service$.getByCategory(id)
            .map(subjects=>new actions.LoadByCategorySuccessAction(subjects))
            .catch(err=>Observable.of(new actions.LoadByCategoryFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addSubject$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(subject=>{
           return  this.service$.add(subject)
            .map(subject=>new actions.AddSuccessAction(subject))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateSubject$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((subject)=>this.service$.update(subject)
            .map(subject=>new actions.UpdateSuccessAction(subject))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteSubject$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((subject)=>this.service$.del(subject)
            .map(subject=>new actions.DeleteSuccessAction(subject))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:SubjectService
    ) {}
}