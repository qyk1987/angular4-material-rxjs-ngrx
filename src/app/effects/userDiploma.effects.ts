import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/userDiploma.action';
import * as userActions from '../actions/user.action';
import { UserDiplomaService } from '../services/userDiploma.service';
import { UserDiploma } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class UserDiplomaEffects {
    @Effect() 
    loadUserDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(userDiplomas=>new actions.LoadUserDiplomaSuccessAction(userDiplomas))
            .catch(err=>Observable.of(new actions.LoadUserDiplomaFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadUserDiplomaByStudent$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_STUDENT)
        .map(toPayload)
        .switchMap(id=>this.service$.getByStudent(id)
            .map(userDiplomas=>new actions.LoadByStudentSuccessAction(userDiplomas))
            .catch(err=>Observable.of(new actions.LoadByStudentFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addUserDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(userDiploma=>{
           return  this.service$.add(userDiploma)
            .map(userDiploma=>new actions.AddUserDiplomaSuccessAction(userDiploma))
            .catch(err=>Observable.of(new actions.AddUserDiplomaFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateUserDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((userDiploma)=>this.service$.update(userDiploma)
            .map(userDiploma=>new actions.UpdateUserDiplomaSuccessAction(userDiploma))
            .catch(err=>Observable.of(new actions.UpdateUserDiplomaFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteUserDiploma$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((userDiploma)=>this.service$.del(userDiploma)
            .map(userDiploma=>new actions.DeleteUserDiplomaSuccessAction(userDiploma))
            .catch(err=>Observable.of(new actions.DeleteUserDiplomaFailAction(JSON.stringify(err))))            
        );   
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:UserDiplomaService
    ) {}
}