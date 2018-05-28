
import { Action } from '@ngrx/store';
import {Student, StuFilter, Page} from '../domain/index';
import {type} from '../utils/type.util';
import { PageResult } from '../vm';
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    ADD:type('[Student] Add') ,
    ADD_SUCCESS:type('[Student] Add Success'),
    ADD_FAIL:type('[Student] Add Fail'),
    UPDATE:type('[Student] Update') ,
    UPDATE_SUCCESS:type('[Student] Update Success'),
    UPDATE_FAIL:type('[Student] Update Fail'),
    DELETE:type('[Student] Delete') ,
    DELETE_SUCCESS:type('[Student] Delete Success'),
    DELETE_FAIL:type('[Student] Delete Fail'),
    LOAD:type('[Student] Load') ,
    LOAD_SUCCESS:type('[Student] Load Success'),
    LOAD_FAIL:type('[Student] Load Fail'),
    LOAD_BY_INTOR:type('[Student] Load By Intor') ,
    LOAD_BY_INTOR_SUCCESS:type('[Student] Load By Intor Success'),
    LOAD_BY_INTOR_FAIL:type('[Student] Load By Intor Fail'),
    UPLOAD_IMG:type('[Student] Upload Img') ,
    UPLOAD_IMG_SUCCESS:type('[Student] Upload Img Success'),
    UPLOAD_IMG_FAIL:type('[Student] Upload Img Fail'),
    UPLOAD_CARD:type('[Student] Upload Card') ,
    UPLOAD_CARD_SUCCESS:type('[Student] Upload Card Success'),
    UPLOAD_CARD_FAIL:type('[Student] Upload Card Fail'),
    LOAD_BY_FILTER:type('[Student] Load By Filter') ,
    LOAD_BY_FILTER_SUCCESS:type('[Student] Load By Filter Success'),
    LOAD_BY_FILTER_FAIL:type('[Student] Load By Filter Fail'),
    SELECT:type('[Student] Select') ,

    SEARCH_LIKE:type('[Student] Search Like') ,
    SEARCH_LIKE_SUCCESS:type('[Student] Search Like Success'),
    SEARCH_LIKE_FAIL:type('[Student] Search Like Fail'),

    LOAD_BY_CLASS:type('[Student] Load By Class') ,
    LOAD_BY_CLASS_SUCCESS:type('[Student] Load By Class Success'),
    LOAD_BY_CLASS_FAIL:type('[Student] Load By Class Fail'),

    UPDATE_SERVICE:type('[Student] Update Service') ,
    UPDATE_SERVICE_SUCCESS:type('[Student] Update Service Success'),
    UPDATE_SERVICE_FAIL:type('[Student] Update Service Fail'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddAction implements Action {
    readonly type = ActionTypes.ADD;

    constructor(public payload: Student) { }
}

export class AddSuccessAction implements Action {
    readonly type = ActionTypes.ADD_SUCCESS;

    constructor(public payload: Student) { }
}
export class AddFailAction implements Action {
    readonly type = ActionTypes.ADD_FAIL;

    constructor(public payload: string) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Student) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Student) { }
}
export class UpdateFailAction implements Action {
    readonly type = ActionTypes.UPDATE_FAIL;

    constructor(public payload: string) { }
}
export class DeleteAction implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload:Student) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_SUCCESS;
    constructor(public payload: Student) { }
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
    constructor(public payload: Student[]) { }
}
export class LoadFailAction implements Action {
    readonly type = ActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}



export class LoadByIntorAction implements Action {
    readonly type = ActionTypes.LOAD_BY_INTOR;
    constructor(public payload:string[]) { }
}

export class LoadByIntorSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_INTOR_SUCCESS;
    constructor(public payload: Student[]) { }
}
export class LoadByIntorFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_INTOR_FAIL;
    constructor(public payload: string) { }
}


//分页导入
export class LoadByFilterAction implements Action {
    readonly type = ActionTypes.LOAD_BY_FILTER;
    constructor(public payload:{filter:StuFilter,key:string,page:Page}) { }
}

export class LoadByFilterSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_FILTER_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByFilterFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_FILTER_FAIL;
    constructor(public payload: string) { }
}

//按班级导入
export class LoadByClassAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CLASS;
    constructor(public payload:{classid:string,key:string,page:Page}) { }
}

export class LoadByClassSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CLASS_SUCCESS;
    constructor(public payload: PageResult) { }
}
export class LoadByClassFailAction implements Action {
    readonly type = ActionTypes.LOAD_BY_CLASS_FAIL;
    constructor(public payload: string) { }
}


export class UploadImgAction implements Action {
    readonly type = ActionTypes.UPLOAD_IMG;
    constructor(public payload:string) { }
}

export class UploadImgSuccessAction implements Action {
    readonly type = ActionTypes.UPLOAD_IMG_SUCCESS;
    constructor(public payload: Student) { }
}
export class UploadImgFailAction implements Action {
    readonly type = ActionTypes.UPLOAD_IMG_SUCCESS;
    constructor(public payload: string) { }
}


export class UploadCardAction implements Action {
    readonly type = ActionTypes.UPLOAD_CARD;
    constructor(public payload:string) { }
}

export class UploadCardSuccessAction implements Action {
    readonly type = ActionTypes.UPLOAD_CARD_SUCCESS;
    constructor(public payload: Student) { }
}
export class UploadCardFailAction implements Action {
    readonly type = ActionTypes.UPLOAD_CARD_SUCCESS;
    constructor(public payload: string) { }
}

export class SelectAction implements Action {
    readonly type = ActionTypes.SELECT;
    constructor(public payload:Student) { }
}



export class SearchLikeSuccessAction implements Action {
    readonly type = ActionTypes.SEARCH_LIKE_SUCCESS;

    constructor(public payload: Student[]) { }
}
export class SearchLikeFailAction implements Action {
    readonly type = ActionTypes.SEARCH_LIKE_FAIL;

    constructor(public payload: string) { }
}
export class SearchLikeAction implements Action {
    readonly type = ActionTypes.SEARCH_LIKE;
    constructor(public payload:string) { }
}


export class UpdateServiceAction implements Action {
    readonly type = ActionTypes.UPDATE_SERVICE;
    constructor(public payload:{postuserid:string,serviceid:string,enrollmentid:string,state:boolean}) { }
}
export class UpdateServiceSuccessAction implements Action {
    readonly type = ActionTypes.UPDATE_SERVICE_SUCCESS;

    constructor(public payload: Student) { }
}
export class UpdateServiceFailAction implements Action {
    readonly type = ActionTypes.UPDATE_SERVICE_FAIL;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = UpdateServiceAction
                        |UpdateServiceSuccessAction
                        |UpdateServiceFailAction
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
                        |LoadByIntorAction
                        |LoadByIntorSuccessAction
                        |LoadByIntorFailAction
                        |LoadByFilterAction
                        |LoadByFilterSuccessAction
                        |LoadByFilterFailAction
                        |LoadByClassAction
                        |LoadByClassSuccessAction
                        |LoadByClassFailAction
                        |UploadImgAction
                        |UploadImgSuccessAction
                        |UploadImgFailAction
                        |UploadCardAction
                        |UploadCardSuccessAction
                        |UploadCardFailAction
                        |SelectAction
                        |SearchLikeAction
                        |SearchLikeFailAction
                        |SearchLikeSuccessAction;
