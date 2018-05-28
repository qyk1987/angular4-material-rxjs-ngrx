
import { Action } from '@ngrx/store';
import {Coupon, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Coupon] Add') ,
    ADD_SUCCESS:type('[Coupon] Add Success'),
    ADD_FAIL:type('[Coupon] Add Fail'),
    UPDATE:type('[Coupon] Update') ,
    UPDATE_SUCCESS:type('[Coupon] Update Success'),
    UPDATE_FAIL:type('[Coupon] Update Fail'),
    DELETE:type('[Coupon] Delete') ,
    DELETE_SUCCESS:type('[Coupon] Delete Success'),
    DELETE_FAIL:type('[Coupon] Delete Fail'),
    LOAD:type('[Coupon] Load') ,
    LOAD_SUCCESS:type('[Coupon] Load Success'),
    LOAD_FAIL:type('[Coupon] Load Fail'),
    LOAD_BY_CAMPUS:type('[Coupon] Load By Campus') ,
    LOAD_BY_CAMPUS_SUCCESS:type('[Coupon] Load By Campus Success'),
    LOAD_BY_CAMPUS_FAIL:type('[Coupon] Load By Campus Fail'),
    LOAD_BY_PAGE:type('[Coupon] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[Coupon] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[Coupon] Load By Page Fail'),
    INVITE_PRODUCTS:type('[Coupon] Invite Products ') ,
    INVITE_PRODUCTS_SUCCESS:type('[Coupon] Invite Products Success'),
    INVITE_PRODUCTS_FAIL:type('[Coupon] Invite Products Fail'),
    INVITE_CAMPUS:type('[Coupon] Invite Campus ') ,
    INVITE_CAMPUS_SUCCESS:type('[Coupon] Invite Campus Success'),
    INVITE_CAMPUS_FAIL:type('[Coupon] Invite Campus Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Coupon) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Coupon) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Coupon) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Coupon) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Coupon) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Coupon) { }
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
    constructor(public payload: Coupon[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}
export class LoadByCampusAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS;
    constructor(public payload:string) { }
}

export class LoadByCampusSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS_SUCCESS;
    constructor(public payload: Coupon[]) { }
}
export class LoadByCampusFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS_FAIL;
    constructor(public payload: string) { }
}

export class LoadByPageAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE;
    constructor(public payload:{state:boolean,key:string,page:Page}) { }
}

export class LoadByPageSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByPageFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE_FAIL;
    constructor(public payload: string) { }
}

export class InviteProductsAction implements Action {
    readonly type = ActionTypes.INVITE_PRODUCTS;

    constructor(public payload:Coupon) { }
}

export class InviteProductsSuccessAction implements Action {
    readonly type = ActionTypes.INVITE_PRODUCTS_SUCCESS;

    constructor(public payload: Coupon) { }
}
export class InviteProductsFailAction implements Action {
    readonly type = ActionTypes.INVITE_PRODUCTS_FAIL;

    constructor(public payload: string) { }
}

export class InviteCampusesAction implements Action {
    readonly type = ActionTypes.INVITE_CAMPUS;

    constructor(public payload:Coupon) { }
}

export class InviteCampusesSuccessAction implements Action {
    readonly type = ActionTypes.INVITE_CAMPUS_SUCCESS;

    constructor(public payload: Coupon) { }
}
export class InviteCampusesFailAction implements Action {
    readonly type = ActionTypes.INVITE_CAMPUS_FAIL;

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
                        |LoadByPageFailAction
                        |InviteProductsAction
                        |InviteProductsSuccessAction
                        |InviteProductsFailAction
                        |InviteCampusesAction
                        |InviteCampusesSuccessAction
                        |InviteCampusesFailAction
                        ;
