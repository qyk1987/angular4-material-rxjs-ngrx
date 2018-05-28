
import { Action } from '@ngrx/store';
import {Page} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    LOAD:type('[Page] Load Page') ,
    PREV:type('[Page] Prev Page'),
    NEXT:type('[Page] Next Page'),
    SET:type('[Page] Set Page'),
    SORT:type('[Page] Load Fail'),
    REFRESH:type('[Page] Refresh Page')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;

    constructor(public payload: Page) { }
}

export class SetAction implements Action {
    readonly type = ActionTypes.SET;

    constructor(public payload: number) { }
}
export class PrevAction implements Action {
    readonly type = ActionTypes.SET;

    constructor(public payload: null) { }
}
export class NextAction implements Action {
    readonly type = ActionTypes.SET;

    constructor(public payload: null) { }
}
export class SortAction implements Action {
    readonly type = ActionTypes.SORT;

    constructor(public payload: {sortOrder:string,sortColumn:string}) { }
}
export class RefreshAction implements Action {
    readonly type = ActionTypes.REFRESH;

    constructor(public payload: null) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PageActions
                        = LoadAction
                        |SetAction
                        |PrevAction
                        |NextAction
                        |SortAction
                        |RefreshAction;
