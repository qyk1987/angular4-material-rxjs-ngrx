
import { Action } from '@ngrx/store';
import {Order, Page, Compensation,OrderFilterData} from '../domain/index';
import {type} from '../utils/type.util';
import { OrderVM, OrderResult, PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Order] Add') ,
    ADD_SUCCESS:type('[Order] Add Success'),
    ADD_FAIL:type('[Order] Add Fail'),
    UPDATE:type('[Order] Update') ,
    UPDATE_SUCCESS:type('[Order] Update Success'),
    UPDATE_FAIL:type('[Order] Update Fail'),
    DELETE:type('[Order] Delete') ,
    DELETE_SUCCESS:type('[Order] Delete Success'),
    DELETE_FAIL:type('[Order] Delete Fail'),
    LOAD:type('[Order] Load') ,
    LOAD_SUCCESS:type('[Order] Load Success'),
    LOAD_FAIL:type('[Order] Load Fail'),
    LOAD_BY_Student:type('[Order] Load By Student') ,
    LOAD_BY_Student_SUCCESS:type('[Order] Load By Student Success'),
    LOAD_BY_Student_FAIL:type('[Order] Load By Student Fail'),
    LOAD_BY_POST:type('[Order] Load By Post') ,
    LOAD_BY_POST_SUCCESS:type('[Order] Load By Post Success'),
    LOAD_BY_POST_FAIL:type('[Order] Load By Post Fail'),

    CHECK_CART:type('[Order] Check Cart'),
    SEARCH_LIKE:type('[Order] Search') ,
    SEARCH_LIKE_SUCCESS:type('[Order] Search Success'),
    SEARCH_LIKE_FAIL:type('[Order] Search Fail'),
    UPDAT_STATE:type('[Order] Update State') ,
    UPDATE_STATE_SUCCESS:type('[Order] Update State Success'),
    UPDATE_STATE_FAIL:type('[Order] Update State Fail'),
    ADD_COMPENSATION:type('[Order] Add Compensation') ,
    ADD_COMPENSATION_SUCCESS:type('[Order] ADD Compensation Success'),
    ADD_COMPENSATION_FAIL:type('[Order]ADD Compensation Fail'),
    UPDATE_COMPENSATION:type('[Order] Update Compensation') ,
    UPDATE_COMPENSATION_SUCCESS:type('[Order] Update Compensation Success'),
    UPDATE_COMPENSATION_FAIL:type('[Order]Update Compensation Fail'),
    DELETE_COMPENSATION:type('[Order] Delete Compensation') ,
    DELETE_COMPENSATION_SUCCESS:type('[Order] Delete Compensation Success'),
    DELETE_COMPENSATION_FAIL:type('[Order]Delete Compensation Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Order) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Order) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Order) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Order) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class UpdateStateAction implements Action {
    readonly type = ActionTypes.UPDAT_STATE;

    constructor(public payload:Order) { }
}

export class UpdateStateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_STATE_SUCCESS;

    constructor(public payload: Order) { }
}
export class UpdateStateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_STATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Order) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Order) { }
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
    constructor(public payload: Order[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadByStudentAction implements Action {
    readonly type = ActionTypes.LOAD_BY_Student;
    constructor(public payload:String) { }
}

export class LoadByStudentSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_Student_SUCCESS;
    constructor(public payload: Order[]) { }
}
export class LoadByStudentFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_Student_FAIL;
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




export class CheckCartAction implements Action {
    readonly type = ActionTypes.CHECK_CART;
    constructor(public payload: Order[]) { }
}

export class SearchLikeSuccessAction implements Action {
    readonly type = ActionTypes.SEARCH_LIKE_SUCCESS;

    constructor(public payload: OrderVM[]) { }
}
export class SearchLikeFailAction implements Action {
    readonly type = ActionTypes.SEARCH_LIKE_FAIL;

    constructor(public payload: string) { }
}
export class SearchLikeAction implements Action {
    readonly type = ActionTypes.SEARCH_LIKE;
    constructor(public payload:{postid:string,key:string}) { }
}


export class AddCompensationAction implements Action {
    readonly type = ActionTypes.ADD_COMPENSATION;
    constructor(public payload:Compensation) { }
}

export class AddCompensationSuccessAction implements Action {
    readonly type = ActionTypes.ADD_COMPENSATION_SUCCESS;
    constructor(public payload:Compensation) { }
}
export class AddCompensationFailAction implements Action {
    readonly type = ActionTypes.ADD_COMPENSATION_FAIL;
    constructor(public payload: string) { }
}



export class UpdateCompensationAction implements Action {
    readonly type = ActionTypes.UPDATE_COMPENSATION;
    constructor(public payload:Compensation) { }
}

export class UpdateCompensationSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_COMPENSATION_SUCCESS;
    constructor(public payload: Compensation) { }
}
export class UpdateCompensationFailAction implements Action {
    readonly type = ActionTypes.UPDATE_COMPENSATION_FAIL;
    constructor(public payload: string) { }
}




export class DeleteCompensationAction implements Action {
    readonly type = ActionTypes.DELETE_COMPENSATION;
    constructor(public payload:Compensation) { }
}

export class DeleteCompensationSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_COMPENSATION_SUCCESS;
    constructor(public payload: Compensation) { }
}
export class DeleteCompensationFailAction implements Action {
    readonly type = ActionTypes.DELETE_COMPENSATION_FAIL;
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
                        |LoadByStudentAction
                        |LoadByStudentSuccessAction
                        |LoadByStudentFailAction
                        |LoadByPostAction
                        |LoadByPostSuccessAction
                        |LoadByPostFailAction
                        |CheckCartAction
                        |SearchLikeAction
                        |SearchLikeSuccessAction
                        |SearchLikeFailAction
                        |UpdateStateAction
                        |UpdateStateSuccessAction
                        |UpdateStateFailAction
                        |AddCompensationAction
                        |AddCompensationSuccessAction
                        |AddCompensationFailAction
                        |UpdateCompensationAction
                        |UpdateCompensationSuccessAction
                        |UpdateCompensationFailAction
                        |DeleteCompensationAction
                        |DeleteCompensationSuccessAction
                        |DeleteCompensationFailAction;
