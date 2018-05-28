import { Subject } from "../domain";
import * as actions from '../actions/subject.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Subject};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateSubject=(state,action)=>{
    const subject=action.payload;
    
    return updateOne(state,subject);
}

const addSubject=(state,action)=>{
    const subject=action.payload;
    if(state.entities[subject.Id]){
        return state;
    }
    const newIds=[... state.ids,subject.Id];
    const newEntities={... state.entities,[subject.Id]:subject};
    return {... state,ids:newIds,entities:newEntities};
}

const delSubject=(state,action)=>{
    const subject = action.payload;
    const ids = state.ids.filter(id => id !== subject.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: subject.Id === state.selectedId ? null : state.selectedId
      };
}

const loadSubjects=(state,action)=>{
    const subjects=action.payload;
   
    if (subjects === null) {
        return state;
      }
    const incomingIds=subjects.map(p=>p.Id);
    const newIds=_.difference(incomingIds,state.ids);
    if (newIds.length === 0) {
        return state;
      }
    const incomingEntities=_.chain(subjects)
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
            return addSubject(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delSubject(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateSubject(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CATEGORY_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadSubjects(state,action);
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