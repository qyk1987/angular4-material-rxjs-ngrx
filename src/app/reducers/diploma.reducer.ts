import { Diploma } from "../domain";
import * as actions from '../actions/diploma.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Diploma};

};

export const initialState: State = {
    ids:[],
    entities:{},
};

const updateDiploma=(state,action)=>{
    const diploma=action.payload;
    
    return updateOne(state,diploma);
}

const addDiploma=(state,action)=>{
    const diploma=action.payload;
    if(state.entities[diploma.Id]){
        return state;
    }
    const newIds=[... state.ids,diploma.Id];
    const newEntities={... state.entities,[diploma.Id]:diploma};
    return {... state,ids:newIds,entities:newEntities};
}

const delDiploma=(state,action)=>{
    const diploma = action.payload;
    const ids = state.ids.filter(id => id !== diploma.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities
      };
}

const loadDiplomas=(state,action)=>{
    const diplomas=action.payload;
   
    if (diplomas === null) {
        return state;
      }
      const incomingIds=diplomas.map(p=>p.Id);
      const incomingEntities=_.chain(diplomas)
          .keyBy('Id')
          .mapValues(o=>o)
          .value();
      const oldIds=_.difference(state.ids,incomingIds);
      if (oldIds.length === 0) {
          return {
              ids:[...incomingIds],
              entities:{...incomingEntities},
              selectedId:null,
          }
      }
      const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
      return {
          ids:[...incomingIds,...oldIds],
          entities:{...oldEntities,...incomingEntities},
          selectedId:null,
      }


 
} 
const loaddiplomasByPage=(state,action)=>{
    const diplomas=action.payload.Data;
   
    if (diplomas === null) {
        return state;
      }
    const incomingIds=diplomas.map(p=>p.Id);
    const incomingEntities=_.chain(diplomas)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
        return {
            ids:[...incomingIds],
            entities:{...incomingEntities},
            selectedId:null,
        }
    }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...incomingIds,...oldIds],
        entities:{...oldEntities,...incomingEntities},
        selectedId:null,
    }

} 

export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addDiploma(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delDiploma(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateDiploma(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadDiplomas(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loaddiplomasByPage(state,action);
        }
        default: {
            return state;
        }
    }
}

export const getIds=(state:State)=>state.ids;
export const getEntities=(state:State)=>state.entities;
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});