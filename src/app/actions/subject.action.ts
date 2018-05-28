
import { Action } from '@ngrx/store';
import {Subject} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Subject] Add') ,
    ADD_SUCCESS:type('[Subject] Add Success'),
    ADD_FAIL:type('[Subject] Add Fail'),
    UPDATE:type('[Subject] Update') ,
    UPDATE_SUCCESS:type('[Subject] Update Success'),
    UPDATE_FAIL:type('[Subject] Update Fail'),
    DELETE:type('[Subject] Delete') ,
    DELETE_SUCCESS:type('[Subject] Delete Success'),
    DELETE_FAIL:type('[Subject] Delete Fail'),
    LOAD:type('[Subject] Load') ,
    LOAD_SUCCESS:type('[Subject] Load Success'),
    LOAD_FAIL:type('[Subject] Load Fail'),
    LOAD_BY_CATEGORY:type('[Subject] Load By Category') ,
    LOAD_BY_CATEGORY_SUCCESS:type('[Subject] Load By Category Success'),
    LOAD_BY_CATEGORY_FAIL:type('[Subject] Load By Category Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Subject) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Subject) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Subject) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Subject) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Subject) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Subject) { }
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
    constructor(public payload: Subject[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadByCategoryAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload:String) { }
}

export class LoadByCategorySuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Subject[]) { }
}
export class LoadByCategoryFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
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
                        |LoadByCategoryAction
                        |LoadByCategorySuccessAction
                        |LoadByCategoryFailAction;
