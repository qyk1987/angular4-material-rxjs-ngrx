import { Campus } from "../domain";
import * as actions from '../actions/campus.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Campus};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateCampus=(state,action)=>{
    const campus=action.payload;
    
    return updateOne(state,campus);
}

const addCampus=(state,action)=>{
    const campus=action.payload;
    if(state.entities[campus.Id]){
        return state;
    }
    const newIds=[... state.ids,campus.Id];
    const newEntities={... state.entities,[campus.Id]:campus};
    return {... state,ids:newIds,entities:newEntities};
}

const delCampus=(state,action)=>{
    const campus = action.payload;
    const ids = state.ids.filter(id => id !== campus.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: campus.Id === state.selectedId ? null : state.selectedId
      };
}

const loadCampuss=(state,action)=>{
    const campuss=action.payload;
   
    if (campuss === null) {
        return state;
      }
      const incomingIds=campuss.map(p=>p.Id);
      const incomingEntities=_.chain(campuss)
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
const loadCampussByPage=(state,action)=>{
    const campuss=action.payload.Data;
   
    if (campuss === null) {
        return state;
      }
    const incomingIds=campuss.map(p=>p.Id);
    const incomingEntities=_.chain(campuss)
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
            return addCampus(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delCampus(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateCampus(state,action);
        }
        case actions.ActionTypes.LOAD_BY_District_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadCampuss(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadCampussByPage(state,action);
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