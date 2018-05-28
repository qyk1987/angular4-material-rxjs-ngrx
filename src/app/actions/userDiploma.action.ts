
import { Action } from '@ngrx/store';
import {UserDiploma} from '../domain/index';
import {type} from '../utils/type.util';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[UserDiploma] Add') ,
    ADD_SUCCESS:type('[UserDiploma] Add Success'),
    ADD_FAIL:type('[UserDiploma] Add Fail'),
    UPDATE:type('[UserDiploma] Update') ,
    UPDATE_SUCCESS:type('[UserDiploma] Update Success'),
    UPDATE_FAIL:type('[UserDiploma] Update Fail'),
    DELETE:type('[UserDiploma] Delete') ,
    DELETE_SUCCESS:type('[UserDiploma] Delete Success'),
    DELETE_FAIL:type('[UserDiploma] Delete Fail'),
    LOAD:type('[UserDiploma] Load') ,
    LOAD_SUCCESS:type('[UserDiploma] Load Success'),
    LOAD_FAIL:type('[UserDiploma] Load Fail'),
    LOAD_BY_STUDENT:type('[UserDiploma] Load By Campus') ,
    LOAD_BY_STUDENT_SUCCESS:type('[UserDiploma] Load By Campus Success'),
    LOAD_BY_STUDENT_FAIL:type('[UserDiploma] Load By Campus Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddUserDiplomaAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: UserDiploma) { }
}

export class AddUserDiplomaSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: UserDiploma) { }
}
export class AddUserDiplomaFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateUserDiplomaAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:UserDiploma) { }
}

export class UpdateUserDiplomaSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: UserDiploma) { }
}
export class UpdateUserDiplomaFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteUserDiplomaAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:UserDiploma) { }
}

export class DeleteUserDiplomaSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: UserDiploma) { }
}
export class DeleteUserDiplomaFailAction implements Action {
    readonly type = ActionTypes.DELETE_FAIL;
    constructor(public payload: string) { }
}

export class LoadUserDiplomaAction implements Action {
    readonly type = ActionTypes.LOAD;
    constructor(public payload:null) { }
}

export class LoadUserDiplomaSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: UserDiploma[]) { }
}
export class LoadUserDiplomaFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}
export class LoadByStudentAction implements Action {
    readonly type = ActionTypes.LOAD_BY_STUDENT;
    constructor(public payload:string) { }
}

export class LoadByStudentSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_STUDENT_SUCCESS;
    constructor(public payload: UserDiploma[]) { }
}
export class LoadByStudentFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_STUDENT_FAIL;
    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = AddUserDiplomaAction
                        |AddUserDiplomaSuccessAction
                        |AddUserDiplomaFailAction
                        |UpdateUserDiplomaAction
                        |UpdateUserDiplomaSuccessAction
                        |UpdateUserDiplomaFailAction
                        |DeleteUserDiplomaAction
                        |DeleteUserDiplomaSuccessAction
                        |DeleteUserDiplomaFailAction
                        |LoadUserDiplomaAction
                        |LoadUserDiplomaSuccessAction
                        |LoadUserDiplomaFailAction
                        |LoadByStudentAction
                        |LoadByStudentSuccessAction
                        |LoadByStudentFailAction;
