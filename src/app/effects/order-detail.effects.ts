import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/order-detail.action';
import { OrderService } from '../services/order.service';
import { Order } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OrderDetailEffects {
    @Effect() 
    loadOrder$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_DATE)
        .map(toPayload)
        .switchMap(p=>this.service$.getDetailsByDate(p.postid,p.data,p.key,p.page)
            .map(orders=>new actions.LoadByDateSuccessAction(orders))
            .catch(err=>Observable.of(new actions.LoadByDateFailAction(JSON.stringify(err))))
        );
    
   
   

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:OrderService,
    ) {}
}