import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/class.action';
import * as stuActions from '../actions/student.action';
import { ClassService } from '../services/class.service';
import { Class } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class ClassEffects {
    @Effect() 
    loadClass$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(clas=>new actions.LoadSuccessAction(clas))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
     @Effect() 
    getClass$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.GET)
        .map(toPayload)
        .switchMap(id=>this.service$.getClass(id)
            .map(clas=>new actions.GetSuccessAction(clas))
            .catch(err=>Observable.of(new actions.GetFailAction(JSON.stringify(err))))
        );
    @Effect() 
    reloadClass$: Observable<Action> = this.actions$.//接受更新学生信号并开始更新
        ofType(stuActions.ActionTypes.UPDATE_SERVICE_SUCCESS)
       .switchMap(_=>this.store$.select(fromRoot.getSelectedClass)
                .take(1)
                .map(cla=> new actions.GetAction(cla.Id))
                
    );
    @Effect() 
    loadClassByDistrict$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_CAMPUS)
        .map(toPayload)
        .switchMap(id=>this.service$.getByDistrict(id)
            .map(clas=>new actions.LoadByCampusSuccessAction(clas))
            .catch(err=>Observable.of(new actions.LoadByCampusFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addClass$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(cla=>{
           return  this.service$.add(cla)
            .map(cla=>new actions.AddSuccessAction(cla))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    selectClass$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.SELECT)
        .map(toPayload)
        .map(cla=>go([`/class/${cla.Id}`])); 
    @Effect() 
    updateClass$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((cla)=>this.service$.update(cla)
            .map(cla=>new actions.UpdateSuccessAction(cla))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );
     @Effect() 
    addstudents$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD_STUDENTS)
        .map(toPayload)
        .switchMap(d=>this.service$.addStudents(d.classid,d.studentids,d.detailids)
            .map(cla=>new actions.AddStudentsSuccessAction(cla))
            .catch(err=>Observable.of(new actions.AddStudentsFailAction(JSON.stringify(err))))            
        );      
    @Effect() 
    deleteClass$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((cla)=>this.service$.del(cla)
            .map(cla=>new actions.DeleteSuccessAction(cla))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
     @Effect() 
    loadClasssByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(data=>this.service$.getByPage(data.productid,data.page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadMenu$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_MENU)
        .map(toPayload)
        .switchMap(_=>this.service$.getMenu()
            .map(result=>new actions.LoadMenuSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadMenuFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadMenu1$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD_SUCCESS)
        .map(toPayload)
        .map(_=> new actions.LoadMenuAction(null));
    @Effect() 
    loadMenu2$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE_SUCCESS)
        .map(toPayload)
        .map(_=> new actions.LoadMenuAction(null));
    @Effect() 
    loadMenu3$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE_SUCCESS)
        .map(toPayload)
        .map(_=> new actions.LoadMenuAction(null));
    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:ClassService
    ) {}
}