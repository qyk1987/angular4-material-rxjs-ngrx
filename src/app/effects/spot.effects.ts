import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/spot.action';
import { SpotService } from '../services/spot.service';
import { Spot } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class SpotEffects {
    @Effect() 
    loadSpot$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(spots=>new actions.LoadSuccessAction(spots))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadSpotByCampus$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_CAMPUS)
        .map(toPayload)
        .switchMap(id=>this.service$.getByCampus(id)
            .map(spots=>new actions.LoadByCampusSuccessAction(spots))
            .catch(err=>Observable.of(new actions.LoadByCampusFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addSpot$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(spot=>{
           return  this.service$.add(spot)
            .map(spot=>new actions.AddSuccessAction(spot))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateSpot$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((spot)=>this.service$.update(spot)
            .map(spot=>new actions.UpdateSuccessAction(spot))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deleteSpot$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((spot)=>this.service$.del(spot)
            .map(spot=>new actions.DeleteSuccessAction(spot))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
     @Effect() 
    loadSpotsByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(page=>this.service$.getByPage(page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:SpotService
    ) {}
}