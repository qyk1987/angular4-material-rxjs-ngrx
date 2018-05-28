import { Receipt } from "../domain";
import * as actions from '../actions/receipt.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Receipt};
    selectedId:string|null;
    selectedState:number|null;
    key:string|null;
};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
    selectedState:null,
    key:null,
};

const updateReceipt=(state,action)=>{
    const receipt=action.payload;
    
    return updateOne(state,receipt);
}

const addReceipt=(state,action)=>{
    const receipt=action.payload;
    if(state.entities[receipt.Id]){
        return state;
    }
    const newIds=[... state.ids,receipt.Id];
    const newEntities={... state.entities,[receipt.Id]:receipt};
    return {... state,ids:newIds,entities:newEntities};
}

const delReceipt=(state,action)=>{
    const receipt = action.payload;
    const ids = state.ids.filter(id => id !== receipt.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: receipt.Id === state.selectedId ? null : state.selectedId
      };
}

const loadReceipts=(state,action)=>{
    const receipts=action.payload;
   
    if (receipts === null) {
        return state;
      }
      const incomingIds=receipts.map(p=>p.Id);
      const incomingEntities=_.chain(receipts)
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

const loadReceiptsByPage=(state,action)=>{
    const receipts=action.payload.Data;
   
    if (receipts === null) {
        return state;
      }
    const incomingIds=receipts.map(p=>p.Id);
    const incomingEntities=_.chain(receipts)
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
const selectState=(state,action)=>{
    const selectstate=action.payload;
    if(selectstate.state<0){
        return{...state,key:selectstate.key,selectedState:null};
    }
    return{...state,key:selectstate.key,selectedState:selectstate.state};
   
} 


export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addReceipt(state,action);
        }
        case actions.ActionTypes.LOAD_BY_POST:{
            return selectState(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delReceipt(state,action);
        }
        case actions.ActionTypes.REMIND_SUCCESS:
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateReceipt(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadReceipts(state,action);
        }
        case actions.ActionTypes.LOAD_BY_POST_SUCCESS:{
            return loadReceiptsByPage(state,action);
        }  
        default: {
            return state;
        }
    }
}
export const getSelectedState=(state:State)=>state.selectedState;
export const getKey=(state:State)=>state.key;
export const getIds=(state:State)=>state.ids;
export const getEntities=(state:State)=>state.entities;
export const getSelectedId=(state:State)=>state.selectedId;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
  });
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});
export const getByState=createSelector(getAll,getSelectedState,getKey,(orders,selectedState,key)=>{
    return selectedState===null?orders.filter(order=>{
        if(key!==null&&key.length>0){
            return order.PosterName.indexOf(key)>-1
        }else{
            return true;
        }
     } ): orders.filter(o=>o.State===selectedState);
});