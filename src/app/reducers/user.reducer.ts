import { User } from "../domain";
import * as actions from '../actions/user.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:User};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateUser=(state,action)=>{
    const user=action.payload;
    
    return updateOne(state,user);
}

const addUser=(state,action)=>{
    const user=action.payload;
    if(state.entities[user.Id]){
        return state;
    }
    const newIds=[... state.ids,user.Id];
    const newEntities={... state.entities,[user.Id]:user};
    return {... state,ids:newIds,entities:newEntities};
}

const delUser=(state,action)=>{
    const user = action.payload;
    const ids = state.ids.filter(id => id !== user.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: user.Id === state.selectedId ? null : state.selectedId
      };
}

const loadUsers=(state,action)=>{
    const users=action.payload;
    if (users === null) {
        return state;
      }
    const incomingIds=users.map(p=>p.Id);
    const incomingEntities=_.chain(users)
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

const loadUsersByPage=(state,action)=>{
    const users=action.payload.Data;
   
    if (users === null) {
        return state;
      }
    const incomingIds=users.map(p=>p.Id);
    const incomingEntities=_.chain(users)
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
            return addUser(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delUser(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateUser(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadUsers(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadUsersByPage(state,action);
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