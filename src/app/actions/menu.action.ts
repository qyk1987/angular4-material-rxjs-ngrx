
import { Action } from '@ngrx/store';
import {Menu} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    LOAD_DISTRICT:type('[Menu] Load District') ,
    LOAD_DISTRICT_SUCCESS:type('[Menu] Load District Success') ,
    LOAD_DISTRICT_FAIL:type('[Menu] Load District Fail') ,
    LOAD_CATEGORY:type('[Menu] Load Category') ,
    LOAD_CATEGORY_SUCCESS:type('[Menu] Load Category Success') ,
    LOAD_CATEGORY_FAIL:type('[Menu] Load Category Fail') ,
    SELECT:type('[Menu] Select') ,

};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class LoadDistrictAction implements Action {
    readonly type = ActionTypes.LOAD_DISTRICT;

    constructor(public payload: null) { }
}

export class LoadDistrictSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_DISTRICT_SUCCESS;

    constructor(public payload: Menu[]) { }
}
export class LoadDistrictFailAction implements Action {
    readonly type = ActionTypes.LOAD_DISTRICT_FAIL;

    constructor(public payload: string) { }
}

export class LoadCategoryAction implements Action {
    readonly type = ActionTypes.LOAD_CATEGORY;

    constructor(public payload: null) { }
}

export class LoadCategorySuccessAction implements Action {
    readonly type = ActionTypes.LOAD_CATEGORY_SUCCESS;

    constructor(public payload: Menu[]) { }
}
export class LoadCategoryFailAction implements Action {
    readonly type = ActionTypes.LOAD_CATEGORY_FAIL;

    constructor(public payload: string) { }
}
export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;

    constructor(public payload: {level:number,id:string}) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = LoadDistrictAction
                        |LoadDistrictSuccessAction
                        |LoadDistrictFailAction
                        |LoadCategoryAction
                        |LoadCategorySuccessAction
                        |LoadCategoryFailAction
                        |SelectAction;
                     