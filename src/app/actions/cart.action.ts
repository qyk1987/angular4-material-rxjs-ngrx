
import { Action } from '@ngrx/store';
import {type} from '../utils/type.util';
import {Order} from '../domain/index';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const ActionTypes= {
    CHANGESET:type('[Cart] Change Set') ,
    UPDATE:type('[Cart] Update'),
    CHANGE_ACTUALPAY:type('[Cart] Change Actualpay'),
    CHANGE_FOROLD:type('[Cart] Change ForOld'),
    CHANGE_DEBT:type('[Cart] Change Debt'),
    CHANGE_COUNT:type('[Cart] Change Count'),
    CANCEL_DEBT:type('[Cart] Cancel Debt'),
    ADD_REMARK:type('[Cart] Add Remark'),
    ADD_TRADENO:type('[Cart] Add TradeNO'),
    ADD_CHANNEL:type('[Cart] Add Channel'),
    ADD_CAMPUS:type('[Cart] Add Campus'),
    SAVE_ORDERS:type('[Cart] Save Orders'),
    SAVE_ORDERS_SUCCESS:type('[Cart] Save Orders Success'),
    SAVE_ORDERS_FAIL:type('[Cart] Save Orders Fail'),
   
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class ChangeSetAction implements Action {
    readonly type = ActionTypes.CHANGESET;

    constructor(public payload: {StudentID:string,ProductIds:string[]}[]) { }
}
export class UpdateAction implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload:Order) { }
}
export class CancelDebtAction implements Action {
    readonly type = ActionTypes.CANCEL_DEBT;

    constructor(public payload:{StudentID:string,ProductId:string}) { }
}
export class ChangeDebtAction implements Action {
    readonly type = ActionTypes.CHANGE_DEBT;

    constructor(public payload:{StudentID:string,ProductId:string,Debt:number}) { }
}
export class ChangeCountAction implements Action {
    readonly type = ActionTypes.CHANGE_COUNT;

    constructor(public payload:{StudentID:string,ProductId:string,Count:number}) { }
}
export class ChangeActualpayAction implements Action {
    readonly type = ActionTypes.CHANGE_ACTUALPAY;

    constructor(public payload:{StudentID:string,ProductId:string,Actualpay:number}) { }
}
export class ChangeForOldAction implements Action {
    readonly type = ActionTypes.CHANGE_FOROLD;

    constructor(public payload:{StudentID:string,ProductId:string,Forold:boolean}) { }
}
export class AddRemarkAction implements Action {
    readonly type = ActionTypes.ADD_REMARK;

    constructor(public payload:{StudentID:string,Remark:string}) { }
}
export class AddTradeNOAction implements Action {
    readonly type = ActionTypes.ADD_TRADENO;

    constructor(public payload:{StudentID:string,TradeNO:string}) { }
}
export class AddChannelAction implements Action {
    readonly type = ActionTypes.ADD_CHANNEL;

    constructor(public payload:{StudentID:string,Channel:string,Value:number}) { }
}
export class AddCampusAction implements Action {
    readonly type = ActionTypes.ADD_CAMPUS;

    constructor(public payload:{StudentID:string,ProductId:string,CampusId:string}) { }
}
export class SaveOrdersAction implements Action {
    readonly type = ActionTypes.SAVE_ORDERS;

    constructor(public payload:Order[]) { }
}
export class SaveOrdersSuccessAction implements Action {
    readonly type = ActionTypes.SAVE_ORDERS_SUCCESS;

    constructor(public payload:string) { }
}
export class SaveOrdersFailAction implements Action {
    readonly type = ActionTypes.SAVE_ORDERS_FAIL;

    constructor(public payload:string) { }
}




/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = ChangeSetAction
                        |UpdateAction
                        |CancelDebtAction
                        |ChangeCountAction
                        |ChangeDebtAction
                        |ChangeActualpayAction
                        |ChangeForOldAction
                        |AddRemarkAction
                        |AddTradeNOAction
                        |AddChannelAction
                        |AddCampusAction
                        |SaveOrdersAction
                        |SaveOrdersSuccessAction
                        |SaveOrdersFailAction;
