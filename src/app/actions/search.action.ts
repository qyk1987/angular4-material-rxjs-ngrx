
import { Action } from '@ngrx/store';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    CHANGE:type('[Search] Change By User'),
    CHANGE_LIKE:type('[Search] Change LikeKey By User'),
    CLEAR:type('[Search] Clear By Search'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */


export class ChangeKeyAction implements Action {
    readonly type = ActionTypes.CHANGE;
    constructor(public payload: string) { }
}
export class ChangeLikeKeyAction implements Action {
    readonly type = ActionTypes.CHANGE_LIKE;
    constructor(public payload: string) { }
}
export class ClearKeyAction implements Action {
    readonly type = ActionTypes.CLEAR;
    constructor(public payload: null) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        =
                        |ChangeKeyAction
                        |ClearKeyAction
                        |ChangeLikeKeyAction;
