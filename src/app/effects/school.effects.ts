import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/school.action';
import * as userActions from '../actions/user.action';
import { SchoolService } from '../services/school.service';
import { School } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class SchoolEffects {
    @Effect() 
    loadSchool$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(schools=>new actions.LoadSuccessAction(schools))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadSchoolsByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(page=>this.service$.getByPage(page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addSchool$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(school=>{
           return  this.service$.add(school)
            .map(school=>new actions.AddSuccessAction(school))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateSchool$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((school)=>this.service$.update(school)
            .map(school=>new actions.UpdateSuccessAction(school))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteSchool$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((school)=>this.service$.del(school)
            .map(school=>new actions.DeleteSuccessAction(school))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:SchoolService
    ) {}
}