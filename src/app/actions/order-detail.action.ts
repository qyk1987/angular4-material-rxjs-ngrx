
import { Action } from '@ngrx/store';
import {Order, Page, Compensation,OrderFilterData} from '../domain/index';
import {type} from '../utils/type.util';
import { OrderVM, OrderResult, PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {

    LOAD_BY_DATE:type('[OrderDetail] Load By Date') ,
    LOAD_BY_DATE_SUCCESS:type('[OrderDetail] Load By Date Success'),
    LOAD_BY_DATE_FAIL:type('[OrderDetail] Load By Date Fail'),

};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */


export class LoadByDateAction implements Action {
    readonly type = ActionTypes.LOAD_BY_DATE;
    constructor(public payload:{postid:string,data:OrderFilterData,key:string,page:Page}) { }
}

export class LoadByDateSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_DATE_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByDateFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_DATE_FAIL;
    constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = 
                        |LoadByDateAction
                        |LoadByDateSuccessAction
                        |LoadByDateFailAction;
