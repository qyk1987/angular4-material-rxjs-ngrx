
import { Action } from '@ngrx/store';
import {Product, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Product] Add') ,
    ADD_SUCCESS:type('[Product] Add Success'),
    ADD_FAIL:type('[Product] Add Fail'),
    UPDATE:type('[Product] Update') ,
    UPDATE_SUCCESS:type('[Product] Update Success'),
    UPDATE_FAIL:type('[Product] Update Fail'),
    DELETE:type('[Product] Delete') ,
    DELETE_SUCCESS:type('[Product] Delete Success'),
    DELETE_FAIL:type('[Product] Delete Fail'),
    LOAD:type('[Product] Load') ,
    LOAD_SUCCESS:type('[Product] Load Success'),
    LOAD_FAIL:type('[Product] Load Fail'),
    LOAD_BY_SUBJECT:type('[Product] Load By Subject') ,
    LOAD_BY_SUBJECT_SUCCESS:type('[Product] Load By Subject Success'),
    LOAD_BY_SUBJECT_FAIL:type('[Product] Load By Subject Fail'),
    LOAD_BY_CAMPUS:type('[Product] Load By Campus') ,
    LOAD_BY_CAMPUS_SUCCESS:type('[Product] Load By Campus Success'),
    LOAD_BY_CAMPUS_FAIL:type('[Product] Load By Campus Fail'),
    LOAD_BY_PAGE:type('[Product] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[Product] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[Product] Load By Page Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Product) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Product) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Product) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Product) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Product) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Product) { }
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
    constructor(public payload: Product[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadBySubjectAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload:string) { }
}

export class LoadBySubjectSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadBySubjectFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadWithCouponByCampusAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS;
    constructor(public payload:string) { }
}

export class LoadWithCouponByCampusSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadWithCouponByCampusFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS_FAIL;
    constructor(public payload: string) { }
}


export class LoadByPageAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE;
    constructor(public payload:{level:number,id:string,page:Page}) { }
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
                        |LoadBySubjectAction
                        |LoadBySubjectSuccessAction
                        |LoadBySubjectFailAction
                        |LoadWithCouponByCampusAction
                        |LoadWithCouponByCampusSuccessAction
                        |LoadWithCouponByCampusFailAction
                        |LoadByPageAction
                        |LoadByPageSuccessAction
                        |LoadByPageFailAction;
