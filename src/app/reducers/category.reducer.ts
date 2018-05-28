import { Category } from "../domain";
import * as actions from '../actions/category.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Category};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateCategory=(state,action)=>{
    const category=action.payload;
    
    return updateOne(state,category);
}

const addCategory=(state,action)=>{
    const category=action.payload;
    if(state.entities[category.Id]){
        return state;
    }
    const newIds=[... state.ids,category.Id];
    const newEntities={... state.entities,[category.Id]:category};
    return {... state,ids:newIds,entities:newEntities};
}

const delCategory=(state,action)=>{
    const category = action.payload;
    const ids = state.ids.filter(id => id !== category.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: category.Id === state.selectedId ? null : state.selectedId
      };
}

const loadCategorys=(state,action)=>{
    const categorys=action.payload;
   
    if (categorys === null) {
        return state;
      }
    const incomingIds=categorys.map(p=>p.Id);
    const newIds=_.difference(incomingIds,state.ids);
    if (newIds.length === 0) {
        return state;
      }
    const incomingEntities=_.chain(categorys)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const newEntities=newIds.reduce((entities,id:string)=>({...entities,[id]:incomingEntities[id]}),{});
    return {
        ids:[...state.ids,...newIds],
        entities:{...state.entities,...newEntities},
        selectedId:null
    }


 
} 


export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addCategory(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delCategory(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateCategory(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadCategorys(state,action);
        }
        case actions.ActionTypes.SELECT:{
            return {... state,selectedId:(<Category>action.payload).Id};
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