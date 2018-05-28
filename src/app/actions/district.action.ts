
import { Action } from '@ngrx/store';
import {District,Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[District] Add') ,
    ADD_SUCCESS:type('[District] Add Success'),
    ADD_FAIL:type('[District] Add Fail'),
    UPDATE:type('[District] Update') ,
    UPDATE_SUCCESS:type('[District] Update Success'),
    UPDATE_FAIL:type('[District] Update Fail'),
    DELETE:type('[District] Delete') ,
    DELETE_SUCCESS:type('[District] Delete Success'),
    DELETE_FAIL:type('[District] Delete Fail'),
    LOAD:type('[District] Load') ,
    LOAD_SUCCESS:type('[District] Load Success'),
    LOAD_FAIL:type('[District] Load Fail'),
    LOAD_BY_PAGE:type('[District] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[District] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[District] Load By Page Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: District) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: District) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:District) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: District) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:District) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: District) { }
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
    constructor(public payload: District[]) { }
}
export class LoadFailAction implements Action {
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
                        |LoadByPageAction
                        |LoadByPageSuccessAction
                        |LoadByPageFailAction;
