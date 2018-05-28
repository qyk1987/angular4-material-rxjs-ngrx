import { Coupon } from "../domain";
import * as actions from '../actions/coupon.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Coupon};
    selectedId:string|null;
    selectState:boolean
};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
    selectState:true
};

const updateCoupon=(state,action)=>{
    const coupon=action.payload;
    
    return updateOne(state,coupon);
}

const addCoupon=(state,action)=>{
    const coupon=action.payload;
    if(state.entities[coupon.Id]){
        return state;
    }
    const newIds=[... state.ids,coupon.Id];
    const newEntities={... state.entities,[coupon.Id]:coupon};
    return {... state,ids:newIds,entities:newEntities};
}
const selectState=(state,action)=>{
    const foo=action.payload.state;
   
    return {... state,selectState:foo};
}

const delCoupon=(state,action)=>{
    const coupon = action.payload;
    const ids = state.ids.filter(id => id !== coupon.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: coupon.Id === state.selectedId ? null : state.selectedId,
        selectState:state.selectState
      };
}

const loadCoupons=(state,action)=>{
    const coupons=action.payload;
    if (coupons === null) {
        return state;
      }
    const incomingIds=coupons.map(p=>p.Id);
    const incomingEntities=_.chain(coupons)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
        return {
            ids:[...incomingIds],
            entities:{...incomingEntities},
            selectedId:null,
            selectState:state.selectState
        }
      }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...incomingIds,...oldIds],
        entities:{...oldEntities,...incomingEntities},
        selectedId:null,
        selectState:state.selectState
    }


 
} 
const loadCouponsByPage=(state,action)=>{
    const coupons=action.payload.Data;
   
    if (coupons === null) {
        return state;
      }
    const incomingIds=coupons.map(p=>p.Id);
    const incomingEntities=_.chain(coupons)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
        return {
            ids:[...incomingIds],
            entities:{...incomingEntities},
            selectedId:null,
            selectState:state.selectState
        }
    }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...incomingIds,...oldIds],
        entities:{...oldEntities,...incomingEntities},
        selectedId:null,
        selectState:state.selectState
    }

} 

export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addCoupon(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delCoupon(state,action);
        }
        case actions.ActionTypes.INVITE_CAMPUS_SUCCESS:
        case actions.ActionTypes.INVITE_PRODUCTS_SUCCESS:
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateCoupon(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE:{
            return selectState(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:
        case actions.ActionTypes.LOAD_BY_CAMPUS_SUCCESS:
        {
            return loadCoupons(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadCouponsByPage(state,action);
        }
        default: {
            return state;
        }
    }
}

export const getIds=(state:State)=>state.ids;
export const getEntities=(state:State)=>state.entities;
export const getSelectedId=(state:State)=>state.selectedId;
export const getSelectState=(state:State)=>state.selectState;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
  });
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});