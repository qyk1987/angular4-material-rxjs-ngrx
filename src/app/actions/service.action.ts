
import { Action } from '@ngrx/store';
import {Service, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Service] Add') ,
    ADD_SUCCESS:type('[Service] Add Success'),
    ADD_FAIL:type('[Service] Add Fail'),
    UPDATE:type('[Service] Update') ,
    UPDATE_SUCCESS:type('[Service] Update Success'),
    UPDATE_FAIL:type('[Service] Update Fail'),
    DELETE:type('[Service] Delete') ,
    DELETE_SUCCESS:type('[Service] Delete Success'),
    DELETE_FAIL:type('[Service] Delete Fail'),
    LOAD:type('[Service] Load') ,
    LOAD_SUCCESS:type('[Service] Load Success'),
    LOAD_FAIL:type('[Service] Load Fail'),
    LOAD_BY_PAGE:type('[Service] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[Service] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[Service] Load By Page Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Service) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Service) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Service) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Service) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Service) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Service) { }
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
    constructor(public payload: Service[]) { }
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
