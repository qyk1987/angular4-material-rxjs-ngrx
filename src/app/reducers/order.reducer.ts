import { Order } from "../domain";
import * as actions from '../actions/order.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
import { OrderVM, StatisticData } from "../vm";
export interface State {
    ids:string[];
    entities:{[id:string]:OrderVM};
    selectedId:string|null;
    selectedState:number|null;
    key:string|null;
    statistic:StatisticData[];

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
    selectedState:-1,
    key:null,
    statistic:null,
};

const updateOrder=(state,action)=>{
    const order=action.payload;
    
    return updateOne(state,order);
}

const addOrder=(state,action)=>{
    const order=action.payload;
    if(state.entities[order.Id]){
        return state;
    }
    const newIds=[... state.ids,order.Id];
    const newEntities={... state.entities,[order.Id]:order};
    return {... state,ids:newIds,entities:newEntities};
}

const delOrder=(state,action)=>{
    const order = action.payload;
    const ids = state.ids.filter(id => id !== order.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: order.Id === state.selectedId ? null : state.selectedId,
        selectedState:state.selectedState,
        key:state.key

      };
}

const loadOrders=(state,action)=>{
    const orders=action.payload;
    if (orders === null) {
        return state;
      }
    const incomingIds=orders.map(p=>p.Id);
    const incomingEntities=_.chain(orders)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
        return {
            ids:[...incomingIds],
            entities:{...incomingEntities},
            selectedId:null,
            selectedState:state.selectedState,
            key:state.key
        }
      }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...incomingIds,...oldIds],
        entities:{...oldEntities,...incomingEntities},
        selectedId:null,
        selectedState:state.selectedState,
        key:state.key
    }
} 

const loadOrdersWithStatistic=(state,action)=>{
    const result=action.payload;
    if (result.Count ===0) {
        return state;
      }
    const order=result.Data[0];
    const incomingIds=order.orders.map(p=>p.Id);
    const incomingEntities=_.chain(order.orders)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
        return {
            ids:[...incomingIds],
            entities:{...incomingEntities},
            selectedId:null,
            selectedState:state.selectedState,
            key:state.key,
            statistic:order.statistic
        }
      }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...incomingIds,...oldIds],
        entities:{...oldEntities,...incomingEntities},
        selectedId:null,
        selectedState:state.selectedState,
        key:state.key,
        statistic:order.statistic
    }
} 
const selectState=(state,action)=>{
    const selectstate=action.payload;
    if(selectstate.state<0){
        return{...state,key:selectstate.key,selectedState:-1};
    }
    return{...state,key:selectstate.key,selectedState:selectstate.state};
   
} 
const updateKey=(state,action)=>{
    const key=action.payload;
    return{...state,key:key.key};
   
} 
const updateState=(state,action)=>{
    const order=action.payload;
    const entitiy=state.entities[order.Id];
    const newentitiy={...entitiy,State:order.State};
    const newentities={...state.entities,[order.Id]:newentitiy};
    return{...state,entities:newentities};
   
} 
//删除补费  就把订单的状态改为有欠费  本来是补费待结
const delCompensation=(state,action)=>{
    const com=action.payload;
    const entitiy=state.entities[com.OrderID];
    const compensations=entitiy.Compensations.filter(c=>c.Id!==com.Id);
    const newentitiy={...entitiy,State:3,Compensations:compensations};
    const newentities={...state.entities,[com.OrderID]:newentitiy};
    return{...state,entities:newentities};
   
} 

const updateCompensation=(state,action)=>{
    const com=action.payload;
    const entitiy=state.entities[com.OrderID];
    const compensations=entitiy.Compensations.filter(c=>c.Id!==com.Id);
    const newCompensations=[...compensations,com];
    const newentitiy={...entitiy,Compensations:newCompensations};
    const newentities={...state.entities,[com.OrderID]:newentitiy};
    return{...state,entities:newentities};
   
} 

const addCompensation=(state,action)=>{
    const com=action.payload;
    const entitiy=state.entities[com.OrderID];
    const compensations=entitiy.Compensations.filter(c=>c.Id!==com.Id);
    const newCompensations=[...compensations,com];
    const newentitiy={...entitiy,State:4,Compensations:newCompensations};
    const newentities={...state.entities,[com.OrderID]:newentitiy};
    return{...state,entities:newentities};
   
} 

export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addOrder(state,action);
        }
        case actions.ActionTypes.LOAD_BY_POST:{
            return selectState(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delOrder(state,action);
        }
        case actions.ActionTypes.DELETE_COMPENSATION_SUCCESS:{
            return delCompensation(state,action);
        }
        case actions.ActionTypes.UPDATE_COMPENSATION_SUCCESS:{
            return updateCompensation(state,action);
        }
        case actions.ActionTypes.ADD_COMPENSATION_SUCCESS:{
            return addCompensation(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateOrder(state,action);
        }
        
        case actions.ActionTypes.UPDATE_STATE_SUCCESS:{
            return updateState(state,action);
        }
        // case actions.ActionTypes.SEARCH_LIKE:{
        //     return updateKey(state,action);
        // }
        case actions.ActionTypes.LOAD_BY_POST_SUCCESS:{
            return loadOrdersWithStatistic(state,action);
        }     
        case actions.ActionTypes.LOAD_BY_Student_SUCCESS:
        //case actions.ActionTypes.SEARCH_LIKE_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadOrders(state,action);
        }
        default: {
            return state;
        }
    }
}
export const getSelectedState=(state:State)=>state.selectedState;
export const getIds=(state:State)=>state.ids;
export const getKey=(state:State)=>state.key;
export const getStatistic=(state:State)=>state.statistic;
export const getEntities=(state:State)=>state.entities;
export const getSelectedId=(state:State)=>state.selectedId;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
  });
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});
export const getByState=createSelector(getAll,getSelectedState,getKey,(orders,selectedState,key)=>{
    return selectedState===-1?orders.filter(order=>{
        if(key!==null&&key.length>0){
            return order.OrderNO.indexOf(key)>-1
                    ||order.TradeNO.indexOf(key)>-1
                    ||order.Student.Name.indexOf(key)>-1;
        }else{
            return true;
        }
     } ): orders.filter(o=>o.State===selectedState);
});
