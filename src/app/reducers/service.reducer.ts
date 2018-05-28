import { Service } from "../domain";
import * as actions from '../actions/service.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Service};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateService=(state,action)=>{
    const service=action.payload;
    
    return updateOne(state,service);
}

const addService=(state,action)=>{
    const service=action.payload;
    if(state.entities[service.Id]){
        return state;
    }
    const newIds=[... state.ids,service.Id];
    const newEntities={... state.entities,[service.Id]:service};
    return {... state,ids:newIds,entities:newEntities};
}

const delService=(state,action)=>{
    const service = action.payload;
    const ids = state.ids.filter(id => id !== service.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: service.Id === state.selectedId ? null : state.selectedId
      };
}

const loadServices=(state,action)=>{
    const services=action.payload;
   
    if (services === null) {
        return state;
      }
      const incomingIds=services.map(p=>p.Id);
      const incomingEntities=_.chain(services)
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
const loadservicesByPage=(state,action)=>{
    const services=action.payload.Data;
   
    if (services === null) {
        return state;
      }
    const incomingIds=services.map(p=>p.Id);
    const incomingEntities=_.chain(services)
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
            return addService(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delService(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateService(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadServices(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadservicesByPage(state,action);
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