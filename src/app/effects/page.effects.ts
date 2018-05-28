import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as stuActions from '../actions/student.action';
import * as ordActions from '../actions/order.action';
import * as actions from '../actions/page.action';

import {of} from 'rxjs/observable/of';
@Injectable()
export class PageEffects {
    // @Effect() 
    // page$: Observable<Action> = this.actions$.
    //     ofType(actions.ActionTypes.LOAD)
    //     .map(toPayload)
    //     .switchMap(()=>this.service$.getPage()
    //         .map(q=>new actions.LoadSuccessAction(q))
    //         .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    //     );

    constructor(
        private actions$: Actions,
    ) {}
}