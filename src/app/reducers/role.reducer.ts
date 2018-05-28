import { Role } from "../domain";
import * as actions from '../actions/role.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Role};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateRole=(state,action)=>{
    const role=action.payload;
    
    return updateOne(state,role);
}

const addRole=(state,action)=>{
    const role=action.payload;
    if(state.entities[role.Id]){
        return state;
    }
    const newIds=[... state.ids,role.Id];
    const newEntities={... state.entities,[role.Id]:role};
    return {... state,ids:newIds,entities:newEntities};
}

const delRole=(state,action)=>{
    const role = action.payload;
    const ids = state.ids.filter(id => id !== role.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: role.Id === state.selectedId ? null : state.selectedId
      };
}

const loadRoles=(state,action)=>{
    const roles=action.payload;
    if (roles === null) {
        return state;
      }
    const incomingIds=roles.map(p=>p.Id);
    const incomingEntities=_.chain(roles)
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

const loadRolesByPage=(state,action)=>{
    const roles=action.payload.Data;
   
    if (roles === null) {
        return state;
      }
    const incomingIds=roles.map(p=>p.Id);
    const incomingEntities=_.chain(roles)
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
            return addRole(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delRole(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateRole(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadRoles(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadRolesByPage(state,action);
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