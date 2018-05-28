
import { Action } from '@ngrx/store';
import {Receipt, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { OrderVM, OrderResult, PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Receipt] Add') ,
    ADD_SUCCESS:type('[Receipt] Add Success'),
    ADD_FAIL:type('[Receipt] Add Fail'),
    UPDATE:type('[Receipt] Update') ,
    UPDATE_SUCCESS:type('[Receipt] Update Success'),
    UPDATE_FAIL:type('[Receipt] Update Fail'),
    DELETE:type('[Receipt] Delete') ,
    DELETE_SUCCESS:type('[Receipt] Delete Success'),
    DELETE_FAIL:type('[Receipt] Delete Fail'),
    LOAD:type('[Receipt] Load') ,
    LOAD_SUCCESS:type('[Receipt] Load Success'),
    LOAD_FAIL:type('[Receipt] Load Fail'),
    LOAD_BY_POST:type('[Receipt] Load By Post') ,
    LOAD_BY_POST_SUCCESS:type('[Receipt] Load By Post Success'),
    LOAD_BY_POST_FAIL:type('[Receipt] Load By Post Fail'),
    REMIND:type('[Receipt] Remind') ,
    REMIND_SUCCESS:type('[Receipt] Remind Success'),
    REMIND_FAIL:type('[Receipt] Remind Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Receipt) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Receipt) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Receipt) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Receipt) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}

export class RemindAction implements Action {
    readonly type = ActionTypes.REMIND;

    constructor(public payload:Receipt) { }
}

export class RemindSuccessAction implements Action {
    readonly type = ActionTypes.REMIND_SUCCESS;

    constructor(public payload: Receipt) { }
}
export class RemindFailAction implements Action {
    readonly type = ActionTypes.REMIND_FAIL;

    constructor(public payload: string) { }
}

export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Receipt) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Receipt) { }
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
    constructor(public payload: Receipt[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadByPostAction implements Action {
    readonly type = ActionTypes.LOAD_BY_POST;
    constructor(public payload:{postid:string,state:number,key:string,page:Page}) { }
}

export class LoadByPostSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_POST_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByPostFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_POST_FAIL;
    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = AddAction
                        |AddSuccessAction
                        |AddFailAction
                        |UpdateAction
                        |UpdateSuccessAction
                        |UpdateFailAction
                        |RemindAction
                        |RemindSuccessAction
                        |RemindFailAction
                        |DeleteAction
                        |DeleteSuccessAction
                        |DeleteFailAction
                        |LoadAction
                        |LoadSuccessAction
                        |LoadFailAction
                        |LoadByPostAction
                        |LoadByPostSuccessAction
                        |LoadByPostFailAction;
