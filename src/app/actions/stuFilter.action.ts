
import { Action } from '@ngrx/store';
import {StuFilter} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    CHANGE:type('[StuFilter] Change By User'),
    CLEAR:type('[StuFilter] Clear By Search'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */


export class ChangeAction implements Action {
    readonly type = ActionTypes.CHANGE;
    constructor(public payload: StuFilter) { }
}
export class ClearAction implements Action {
    readonly type = ActionTypes.CLEAR;
    constructor(public payload: null) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        =
                        |ChangeAction
                        |ClearAction;
