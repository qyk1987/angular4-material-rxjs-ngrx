import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/menu.action';
import * as disActions from '../actions/district.action';
import * as camActions from '../actions/campus.action';
import * as spotActions from '../actions/spot.action';
import * as catActions from '../actions/category.action';
import * as subActions from '../actions/subject.action';
import { DistrictService } from '../services/district.service';
import {go} from '@ngrx/router-store';
import {of} from 'rxjs/observable/of';
import { ProductService } from '../services';
@Injectable()
export class MenuEffects {
    @Effect() 
    login$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_DISTRICT)
        .map(toPayload)
        .switchMap(_=>this.service$.getMenu())
            .map(menu=>new actions.LoadDistrictSuccessAction(menu))
            .catch(err=>Observable.of(new actions.LoadDistrictFailAction(JSON.stringify(err)))
        );
    @Effect() 
    loadcategory$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_CATEGORY)
        .map(toPayload)
        .switchMap(_=>this.prdService$.getMenu())
            .map(menu=>new actions.LoadCategorySuccessAction(menu))
            .catch(err=>Observable.of(new actions.LoadCategoryFailAction(JSON.stringify(err)))
        );
    @Effect() 
    adddis$: Observable<Action> = this.actions$.
        ofType(disActions.ActionTypes.ADD_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    addcam$: Observable<Action> = this.actions$.
        ofType(camActions.ActionTypes.ADD_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    addspot$: Observable<Action> = this.actions$.
        ofType(spotActions.ActionTypes.ADD_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    editdis$: Observable<Action> = this.actions$.
        ofType(disActions.ActionTypes.UPDATE_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    deldis$: Observable<Action> = this.actions$.
        ofType(disActions.ActionTypes.DELETE_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    editcam$: Observable<Action> = this.actions$.
        ofType(camActions.ActionTypes.UPDATE_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    delcam$: Observable<Action> = this.actions$.
        ofType(camActions.ActionTypes.DELETE_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    editspot$: Observable<Action> = this.actions$.
        ofType(spotActions.ActionTypes.UPDATE_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));
    @Effect() 
    delspot$: Observable<Action> = this.actions$.
        ofType(spotActions.ActionTypes.DELETE_SUCCESS)
        .map(_=>new actions.LoadDistrictAction(null));


    @Effect() 
    addcat$: Observable<Action> = this.actions$.
        ofType(catActions.ActionTypes.ADD_SUCCESS)
        .map(_=>new actions.LoadCategoryAction(null));
        @Effect() 
    editcat$: Observable<Action> = this.actions$.
        ofType(catActions.ActionTypes.UPDATE_SUCCESS)
        .map(_=>new actions.LoadCategoryAction(null));
    @Effect() 
    delcat$: Observable<Action> = this.actions$.
        ofType(catActions.ActionTypes.DELETE_SUCCESS)
        .map(_=>new actions.LoadCategoryAction(null));
        
    @Effect() 
    addsub$: Observable<Action> = this.actions$.
        ofType(subActions.ActionTypes.ADD_SUCCESS)
        .map(_=>new actions.LoadCategoryAction(null));
        @Effect() 
    editsub$: Observable<Action> = this.actions$.
        ofType(subActions.ActionTypes.UPDATE_SUCCESS)
        .map(_=>new actions.LoadCategoryAction(null));
    @Effect() 
    delsub$: Observable<Action> = this.actions$.
        ofType(subActions.ActionTypes.DELETE_SUCCESS)
        .map(_=>new actions.LoadCategoryAction(null));
    constructor(
        private actions$: Actions,
        private service$:DistrictService,
        private prdService$:ProductService
    ) {}
}