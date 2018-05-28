import { District } from "../domain";
import * as actions from '../actions/district.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:District};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateDistrict=(state,action)=>{
    const district=action.payload;
    
    return updateOne(state,district);
}

const addDistrict=(state,action)=>{
    const district=action.payload;
    if(state.entities[district.Id]){
        return state;
    }
    const newIds=[... state.ids,district.Id];
    const newEntities={... state.entities,[district.Id]:district};
    return {... state,ids:newIds,entities:newEntities};
}

const delDistrict=(state,action)=>{
    const district = action.payload;
    const ids = state.ids.filter(id => id !== district.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: district.Id === state.selectedId ? null : state.selectedId
      };
}

const loadDistricts=(state,action)=>{
    const districts=action.payload;
   
    if (districts === null) {
        return state;
      }
      const incomingIds=districts.map(p=>p.Id);
      const incomingEntities=_.chain(districts)
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
const loadDistrictsByPage=(state,action)=>{
    const districts=action.payload.Data;
   
    if (districts === null) {
        return state;
      }
    const incomingIds=districts.map(p=>p.Id);
    const incomingEntities=_.chain(districts)
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
            return addDistrict(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delDistrict(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateDistrict(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadDistricts(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadDistrictsByPage(state,action);
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