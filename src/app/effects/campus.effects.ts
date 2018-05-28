import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/campus.action';
import { CampusService } from '../services/campus.service';
import { Campus } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class CampusEffects {
    @Effect() 
    loadCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(campuss=>new actions.LoadSuccessAction(campuss))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadCampusByDistrict$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_District)
        .map(toPayload)
        .switchMap(id=>this.service$.getByDistrict(id)
            .map(campuss=>new actions.LoadByDistrictSuccessAction(campuss))
            .catch(err=>Observable.of(new actions.LoadByDistrictFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(campus=>{
           return  this.service$.add(campus)
            .map(campus=>new actions.AddSuccessAction(campus))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((campus)=>this.service$.update(campus)
            .map(campus=>new actions.UpdateSuccessAction(campus))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((campus)=>this.service$.del(campus)
            .map(campus=>new actions.DeleteSuccessAction(campus))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
     @Effect() 
    loadCampussByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(page=>this.service$.getByPage(page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:CampusService
    ) {}
}