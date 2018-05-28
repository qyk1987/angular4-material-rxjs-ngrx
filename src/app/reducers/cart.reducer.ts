import { Order } from "../domain";
import * as actions from '../actions/cart.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Order};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateTempOrder=(state,action)=>{
    const order=action.payload;
    const id=order.StudentID;
    if(state.ids.indexOf(id)>-1){
        return {...state, selectedId:order.StudentID};
    }
    const ids=[...state.ids,id];
    const entities = {...state.entities, [order.StudentID]: order};
    return {...state,ids:ids, entities: entities,selectedId:order.StudentID};
}

const addRemark=(state,action)=>{
    const remark=action.payload;
    const key=remark.StudentID;
    const entity=state.entities[key];
    const entities = {...state.entities, [key]: {...entity,Remark:remark.Remark}};
    return {...state, entities: entities};
}
const addTradeNO=(state,action)=>{
    const trade=action.payload;
    const key=trade.StudentID;
    const entity=state.entities[key];
    const entities = {...state.entities, [key]: {...entity,TradeNO:trade.TradeNO}};
    return {...state, entities: entities};
}
const addChannel=(state,action)=>{
    const remark=action.payload;
    const key=remark.StudentID;
    const entity=state.entities[key];
    const newchannel={
        Channel:remark.Channel,
        Value:remark.Value
    }
    const oldids=entity.ChannelIds.filter(id=>id!==remark.Channel);
    const newids=[...oldids,remark.Channel];
    const newchannels={...entity.channels,[remark.Channel]:newchannel};
    const total=newids.map(id=>newchannels[id]).map(c=>c.Value).reduce(function (prev, cur, index, arr) {
        return prev+cur;
    });//计算所有收到的金额和
    if(remark.Value<=0||total>entity.ActualPay){
        return state;//如果金额小于零或者总金额大于应付金额则什么都不做
    }
    const newentity={...entity,channels:newchannels,ChannelIds:newids,pay:total};
    const entities = {...state.entities, [key]:newentity};
    return {...state, entities: entities};
}

const cancelDebt=(state,action)=>{
    const remark=action.payload;
    const sid=remark.StudentID;
    const pid=remark.ProductId;
    const entity=state.entities[sid];
    const detail=entity.details[pid];
    const details={...entity.details,[pid]:{
        ...detail,
        IsDebt:false,
        Debt:0,

    }};
    const newentity={...entity,details:details,channels:[],ChannelIds:[]};
    const entities = {...state.entities, [sid]:newentity};
    return {...state, entities: entities};
}
const changeActualpay=(state,action)=>{
    const remark=action.payload;
    const sid=remark.StudentID;
    const pid=remark.ProductId;
    const entity=state.entities[sid];
    const detail=entity.details[pid];

    const details={...entity.details,[pid]:{
        ...detail,
        ActualPay:remark.Actualpay,
        IsDebt:detail.discountPrice*detail.Count-remark.Actualpay>0,
        Debt:detail.discountPrice*detail.Count-remark.Actualpay
    }};
    const  newentity={...entity,details:details,channels:[],ChannelIds:[]};
    const entities = {...state.entities, [sid]: newentity};
    return {...state, entities: entities};
}
const changeDebt=(state,action)=>{
    const debt=action.payload;
    const sid=debt.StudentID;
    const pid=debt.ProductId;
    const entity=state.entities[sid];
    const detail=entity.details[pid];
    const details={...entity.details,[pid]:{
        ...detail,
        IsDebt:true,
        Debt:debt.Debt
    }};
    const  newentity={...entity,details:details,channels:[],ChannelIds:[]};
    const entities = {...state.entities, [sid]: newentity};
    return {...state, entities: entities};
}
const changeCount=(state,action)=>{
    const count=action.payload;
    const sid=count.StudentID;
    const pid=count.ProductId;
    const entity=state.entities[sid];
    const detail=entity.details[pid];
    if(count.Count<1){
        return state;
    }
    const details={...entity.details,[pid]:{
        ...detail,
        Count:count.Count,
        ActualPay:detail.discountPrice*count.Count,
        IsDebt:false,
        Debt:0
    }};
    const  newentity={...entity,details:details,channels:[],ChannelIds:[]};
    const entities = {...state.entities, [sid]: newentity};
    return {...state, entities: entities};
}
const changeOld=(state,action)=>{
    const old=action.payload;
    const sid=old.StudentID;
    const pid=old.ProductId;
    const entity=state.entities[sid];
    const detail=entity.details[pid];
    const discount=old.Forold?detail.discount+detail.canOldValue:detail.discount-detail.canOldValue;
    const details={...entity.details,[pid]:{
        ...detail,
        IsDebt:false,
        Debt:0,
        ActualPay:detail.price-discount,
        IsDiscountForOld:old.Forold,
        discount:discount,
        discountPrice:detail.price-discount
    }};
    const  newentity={...entity,details:details,channels:[],ChannelIds:[]};
    const entities = {...state.entities, [sid]: newentity};
    return {...state, entities: entities};
}
const addCampus=(state,action)=>{
    const campus=action.payload;
    const sid=campus.StudentID;
    const pid=campus.ProductId;
    const entity=state.entities[sid];
    const detail=entity.details[pid];
    const details={...entity.details,[pid]:{
        ...detail,
        CampusId:campus.CampusId
    }};
    const  newentity={...entity,details:details};
    const entities = {...state.entities, [sid]: newentity};
    return {...state, entities: entities};
}




export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) {        
        case actions.ActionTypes.UPDATE:{
            return updateTempOrder(state,action);
        }
        case actions.ActionTypes.ADD_REMARK:{
            return addRemark(state,action);
        }
        case actions.ActionTypes.ADD_CHANNEL:{
            return addChannel(state,action);
        }
        case actions.ActionTypes.ADD_TRADENO:{
            return addTradeNO(state,action);
        }
        case actions.ActionTypes.ADD_CAMPUS:{
            return addCampus(state,action);
        }
        case actions.ActionTypes.CANCEL_DEBT:{
            return cancelDebt(state,action);
        }
        case actions.ActionTypes.CHANGE_ACTUALPAY:{
            return changeActualpay(state,action);
        }
        case actions.ActionTypes.CHANGE_DEBT:{
            return changeDebt(state,action);
        }
        case actions.ActionTypes.CHANGE_COUNT:{
            return changeCount(state,action);
        }
        case actions.ActionTypes.CHANGE_FOROLD:{
            return changeOld(state,action);
        }
        case actions.ActionTypes.SAVE_ORDERS_SUCCESS:{
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export const getIds=(state:State)=>state.ids;
export const getEntities=(state:State)=>state.entities;
export const getSelectedId=(state:State)=>state.selectedId;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
  });
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});
