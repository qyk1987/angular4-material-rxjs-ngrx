
import { Action } from '@ngrx/store';
import {Role, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Role] Add') ,
    ADD_SUCCESS:type('[Role] Add Success'),
    ADD_FAIL:type('[Role] Add Fail'),
    UPDATE:type('[Role] Update') ,
    UPDATE_SUCCESS:type('[Role] Update Success'),
    UPDATE_FAIL:type('[Role] Update Fail'),
    DELETE:type('[Role] Delete') ,
    DELETE_SUCCESS:type('[Role] Delete Success'),
    DELETE_FAIL:type('[Role] Delete Fail'),
    LOAD:type('[Role] Load') ,
    LOAD_SUCCESS:type('[Role] Load Success'),
    LOAD_FAIL:type('[Role] Load Fail'),
    LOAD_BY_PAGE:type('[Role] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[Role] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[Role] Load By Page Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Role) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Role) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Role) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Role) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Role) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Role) { }
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
    constructor(public payload: Role[]) { }
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
