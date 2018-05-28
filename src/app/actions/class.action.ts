
import { Action } from '@ngrx/store';
import {Class,MenuVM, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Class] Add') ,
    ADD_SUCCESS:type('[Class] Add Success'),
    ADD_FAIL:type('[Class] Add Fail'),
    UPDATE:type('[Class] Update') ,
    UPDATE_SUCCESS:type('[Class] Update Success'),
    UPDATE_FAIL:type('[Class] Update Fail'),
    DELETE:type('[Class] Delete') ,
    DELETE_SUCCESS:type('[Class] Delete Success'),
    DELETE_FAIL:type('[Class] Delete Fail'),
    LOAD:type('[Class] Load') ,
    LOAD_SUCCESS:type('[Class] Load Success'),
    LOAD_FAIL:type('[Class] Load Fail'),
    LOAD_BY_CAMPUS:type('[Class] Load By Campus') ,
    LOAD_BY_CAMPUS_SUCCESS:type('[Class] Load By Campus Success'),
    LOAD_BY_CAMPUS_FAIL:type('[Class] Load By Campus Fail'),
    LOAD_BY_PAGE:type('[Class] Load By Page') ,
    LOAD_BY_PAGE_SUCCESS:type('[Class] Load By Page Success'),
    LOAD_BY_PAGE_FAIL:type('[Class] Load By Page Fail'),
    LOAD_MENU:type('[Class] Load Menu') ,
    LOAD_MENU_SUCCESS:type('[Class] Load Menu Success'),
    LOAD_MENU_FAIL:type('[Class] Load Menu Fail'),
    ADD_STUDENTS:type('[Class] Add Students') ,
    ADD_STUDENTS_SUCCESS:type('[Class] Add Students Success'),
    ADD_STUDENTS_FAIL:type('[Class] Add Students Fail'),
    SELECT:type('[Class] Select') ,
    GET:type('[Class] Get Class') ,
    GET_SUCCESS:type('[Class] Get Class Success'),
    GET_FAIL:type('[Class] Get Class Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Class) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Class) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Class) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Class) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Class) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Class) { }
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
    constructor(public payload: Class[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}

export class LoadByCampusAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS;
    constructor(public payload:String) { }
}

export class LoadByCampusSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS_SUCCESS;
    constructor(public payload: Class[]) { }
}
export class LoadByCampusFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CAMPUS_FAIL;
    constructor(public payload: string) { }
}
export class LoadByPageAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE;
    constructor(public payload:{productid:string,page:Page}) { }
}

export class LoadByPageSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByPageFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_PAGE_FAIL;
    constructor(public payload: string) { }
}

export class LoadMenuAction implements Action {
    readonly type = ActionTypes.LOAD_MENU;
    constructor(public payload:null) { }
}

export class LoadMenuSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_MENU_SUCCESS;
    constructor(public payload: MenuVM[]) { }
}
export class LoadMenuFailAction implements Action {
    readonly type = ActionTypes.LOAD_MENU_FAIL;
    constructor(public payload: string) { }
}

export class AddStudentsAction implements Action {
    readonly type = ActionTypes.ADD_STUDENTS;
    constructor(public payload:{classid:string,studentids:string[],detailids:string[]}) { }
}

export class AddStudentsSuccessAction implements Action {
    readonly type = ActionTypes.ADD_STUDENTS_SUCCESS;
    constructor(public payload: Class) { }
}
export class AddStudentsFailAction implements Action {
    readonly type = ActionTypes.ADD_STUDENTS_FAIL;
    constructor(public payload: string) { }
}
export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;
    constructor(public payload:Class) { }
}

export class GetAction implements Action {
    readonly type = ActionTypes.GET;
    constructor(public payload:string) { }
}

export class GetSuccessAction implements Action {
    readonly type = ActionTypes.GET_SUCCESS;
    constructor(public payload: Class) { }
}
export class GetFailAction implements Action {
    readonly type = ActionTypes.GET_FAIL;
    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = GetAction
                        |GetSuccessAction
                        |GetFailAction
                        |AddAction
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
                        |LoadMenuAction
                        |LoadMenuSuccessAction
                        |LoadMenuFailAction
                        |LoadByPageAction
                        |LoadByPageSuccessAction
                        |LoadByPageFailAction
                        |AddStudentsAction
                        |AddStudentsSuccessAction
                        |AddStudentsFailAction;
