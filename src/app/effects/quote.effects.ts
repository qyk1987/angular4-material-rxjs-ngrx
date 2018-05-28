import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/quote.action';
import { QuoteService } from '../services/quote.service';
import {of} from 'rxjs/observable/of';
@Injectable()
export class QuoteEffects {
    @Effect() 
    quote$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(()=>this.service$.getQuote()
            .map(q=>new actions.LoadSuccessAction(q))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );

    constructor(
        private actions$: Actions,
        private service$:QuoteService
    ) {}
}