import { Compensation } from "../domain";
import * as actions from '../actions/compensation.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Compensation};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateCompensation=(state,action)=>{
    const compensation=action.payload;
    
    return updateOne(state,compensation);
}

const addCompensation=(state,action)=>{
    const compensation=action.payload;
    if(state.entities[compensation.Id]){
        return state;
    }
    const newIds=[... state.ids,compensation.Id];
    const newEntities={... state.entities,[compensation.Id]:compensation};
    return {... state,ids:newIds,entities:newEntities};
}

const delCompensation=(state,action)=>{
    const compensation = action.payload;
    const ids = state.ids.filter(id => id !== compensation.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: compensation.Id === state.selectedId ? null : state.selectedId
      };
}

const loadCompensations=(state,action)=>{
    const compensations=action.payload;
   
    if (compensations === null) {
        return state;
      }
    const incomingIds=compensations.map(p=>p.Id);
    const newIds=_.difference(incomingIds,state.ids);
    if (newIds.length === 0) {
        return state;
      }
    const incomingEntities=_.chain(compensations)
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
            return addCompensation(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delCompensation(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateCompensation(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadCompensations(state,action);
        }
        case actions.ActionTypes.SELECT:{
            return {... state,selectedId:(<Compensation>action.payload).Id};
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