import { School } from "../domain";
import * as actions from '../actions/school.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:School};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateSchool=(state,action)=>{
    const school=action.payload;
    
    return updateOne(state,school);
}

const addSchool=(state,action)=>{
    const school=action.payload;
    if(state.entities[school.Id]){
        return state;
    }
    const newIds=[... state.ids,school.Id];
    const newEntities={... state.entities,[school.Id]:school};
    return {... state,ids:newIds,entities:newEntities};
}

const delSchool=(state,action)=>{
    const school = action.payload;
    const ids = state.ids.filter(id => id !== school.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: school.Id === state.selectedId ? null : state.selectedId
      };
}

const loadSchools=(state,action)=>{
    const schools=action.payload;
    if (schools === null) {
        return state;
      }
    const incomingIds=schools.map(p=>p.Id);
    const incomingEntities=_.chain(schools)
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

const loadSchoolsByPage=(state,action)=>{
    const schools=action.payload.Data;
   
    if (schools === null) {
        return state;
      }
    const incomingIds=schools.map(p=>p.Id);
    const incomingEntities=_.chain(schools)
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
            return addSchool(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delSchool(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateSchool(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadSchools(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadSchoolsByPage(state,action);
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