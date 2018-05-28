
import { Action } from '@ngrx/store';
import {Compensation} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Compensation] Add') ,
    ADD_SUCCESS:type('[Compensation] Add Success'),
    ADD_FAIL:type('[Compensation] Add Fail'),
    UPDATE:type('[Compensation] Update') ,
    UPDATE_SUCCESS:type('[Compensation] Update Success'),
    UPDATE_FAIL:type('[Compensation] Update Fail'),
    DELETE:type('[Compensation] Delete') ,
    DELETE_SUCCESS:type('[Compensation] Delete Success'),
    DELETE_FAIL:type('[Compensation] Delete Fail'),
    LOAD:type('[Compensation] Load') ,
    LOAD_SUCCESS:type('[Compensation] Load Success'),
    LOAD_FAIL:type('[Compensation] Load Fail'),
    SELECT:type('[Compensation] Select'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Compensation) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Compensation) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Compensation) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Compensation) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Compensation) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Compensation) { }
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
    constructor(public payload: Compensation[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}


export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;
    constructor(public payload:Compensation) { }
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
                        |SelectAction;
