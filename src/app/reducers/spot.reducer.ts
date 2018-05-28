import { Spot } from "../domain";
import * as actions from '../actions/spot.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Spot};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateSpot=(state,action)=>{
    const spot=action.payload;
    
    return updateOne(state,spot);
}

const addSpot=(state,action)=>{
    const spot=action.payload;
    if(state.entities[spot.Id]){
        return state;
    }
    const newIds=[... state.ids,spot.Id];
    const newEntities={... state.entities,[spot.Id]:spot};
    return {... state,ids:newIds,entities:newEntities};
}

const delSpot=(state,action)=>{
    const spot = action.payload;
    const ids = state.ids.filter(id => id !== spot.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: spot.Id === state.selectedId ? null : state.selectedId
      };
}

const loadSpots=(state,action)=>{
    const spots=action.payload;
   
    if (spots === null) {
        return state;
      }
      const incomingIds=spots.map(p=>p.Id);
      const incomingEntities=_.chain(spots)
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

const loadSpotsByPage=(state,action)=>{
    const spots=action.payload.Data;
   
    if (spots === null) {
        return state;
      }
    const incomingIds=spots.map(p=>p.Id);
    const incomingEntities=_.chain(spots)
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
            return addSpot(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delSpot(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateSpot(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CAMPUS_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadSpots(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadSpotsByPage(state,action);
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