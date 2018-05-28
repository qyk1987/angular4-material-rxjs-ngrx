
import { Action } from '@ngrx/store';
import {Spot, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Spot] Add') ,
    ADD_SUCCESS:type('[Spot] Add Success'),
    ADD_FAIL:type('[Spot] Add Fail'),
    UPDATE:type('[Spot] Update') ,
    UPDATE_SUCCESS:type('[Spot] Update Success'),
    UPDATE_FAIL:type('[Spot] Update Fail'),
    DELETE:type('[Spot] Delete') ,
    DELETE_SUCCESS:type('[Spot] Delete Success'),
    DELETE_FAIL:type('[Spot] Delete Fail'),
    LOAD:type('[Spot] Load') ,
    LOAD_SUCCESS:type('[Spot] Load Success'),
    LOAD_FAIL:type('[Spot] Load Fail'),
    LOAD_BY_CAMPUS:type('[Spot] Load By Campus') ,
    LOAD_BY_CAMPUS_SUCCESS:type('[Spot] Load By Campus Success'),
    LOAD_BY_CAMPUS_FAIL:type('[Spot] Load By Campus Fail'),
    LOAD_BY_PAGE:type('[Spot] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[Spot] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[Spot] Load By Page Fail'),
    
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Spot) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Spot) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Spot) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Spot) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Spot) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Spot) { }
}
export class DeleteFailAction implements Action {
    readonly type = ActionTypes.DELETE_FAIL;
    constructor(public payload: string) { }
}

export class LoadAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload:null) { }
}

export class LoadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Spot[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadByCampusAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload:String) { }
}

export class LoadByCampusSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Spot[]) { }
}
export class LoadByCampusFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}
export class LoadByPageAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE;
    constructor(public payload:Page) { }
}

export class LoadByPageSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByPageFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE_FAIL;
    constructor(public payload: string) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = AddAction
                        | AddSuccessAction
                        |AddFailAction
                        |UpdateAction
                        |UpdateSuccessAction
                        |UpdateFailAction
                        |DeleteAction
                        |DeleteSuccessAction
                        |DeleteFailAction
                        |LoadAction
                        |LoadSuccessAction
                        |LoadFailAction
                        |LoadByCampusAction
                        |LoadByCampusSuccessAction
                        |LoadByCampusFailAction
                        |LoadByPageAction
                        |LoadByPageSuccessAction
                        |LoadByPageFailAction;
