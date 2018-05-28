import { Class, MenuVM } from "../domain";
import * as actions from '../actions/class.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
import { ClassVM } from "../vm/class.vm";
export interface State {
    ids:string[];
    entities:{[id:string]:ClassVM};
    selectedId:string|null;
    menu:MenuVM[]|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
    menu:null
};

const updateClass=(state,action)=>{
    const cla=action.payload;
    
    return updateOne(state,cla);
}

const addClass=(state,action)=>{
    const cla=action.payload;
    if(state.entities[cla.Id]){
        return state;
    }
    const newIds=[... state.ids,cla.Id];
    const newEntities={... state.entities,[cla.Id]:cla};
    return {... state,ids:newIds,entities:newEntities};
}
const setMenu=(state,action)=>{
    const menu=action.payload;
    
    return {... state,menu:menu};
}

const delClass=(state,action)=>{
    const cla = action.payload;
    const ids = state.ids.filter(id => id !== cla.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: cla.Id === state.selectedId ? null : state.selectedId,
        menu:state.menu
      };
}

const loadClasss=(state,action)=>{
    const clas=action.payload;
   
    if (clas === null) {
        return state;
      }
      const incomingIds=clas.map(p=>p.Id);
      const incomingEntities=_.chain(clas)
          .keyBy('Id')
          .mapValues(o=>o)
          .value();
      const oldIds=_.difference(state.ids,incomingIds);
      if (oldIds.length === 0) {
          return {
              ids:[...incomingIds],
              entities:{...incomingEntities},
              selectedId:null,
              menu:state.menu
          }
      }
      const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
      return {
          ids:[...incomingIds,...oldIds],
          entities:{...oldEntities,...incomingEntities},
          selectedId:null,
          menu:state.menu
      }


 
} 

const getClass=(state,action)=>{
    const cla=action.payload;
   
    if (cla === null) {
        return state;
    }
    if(state.ids.indexOf(cla.Id)>-1){
        const newEntities={... state.entities,[cla.Id]:cla};
        return {
            ...state,
            entities:newEntities
        }
    }else{
        const newIds=[... state.ids,cla.Id];
        const newEntities={... state.entities,[cla.Id]:cla};
        return {... state,ids:newIds,entities:newEntities};
    }
     
} 
const loadClasssByPage=(state,action)=>{
    const clas=action.payload.Data;
   
    if (clas === null) {
        return state;
      }
    const incomingIds=clas.map(p=>p.Id);
    const incomingEntities=_.chain(clas)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
        return {
            ids:[...incomingIds],
            entities:{...incomingEntities},
            selectedId:null,
            menu:state.menu
        }
    }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...incomingIds,...oldIds],
        entities:{...oldEntities,...incomingEntities},
        selectedId:null,
        menu:state.menu
    }

} 

export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addClass(state,action);
        }
        case actions.ActionTypes.GET_SUCCESS:{
            return getClass(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delClass(state,action);
        }
        case actions.ActionTypes.LOAD_MENU_SUCCESS:{
            return setMenu(state,action);
        }
        case actions.ActionTypes.ADD_STUDENTS_SUCCESS:
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateClass(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CAMPUS_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadClasss(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CAMPUS_SUCCESS:
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadClasssByPage(state,action);
        }
        case actions.ActionTypes.SELECT:{
            return {... state,selectedId:(<Class>action.payload).Id};
        }
        default: {
            return state;
        }
    }
}

export const getIds=(state:State)=>state.ids;
export const getEntities=(state:State)=>state.entities;
export const getSelectedId=(state:State)=>state.selectedId;
export const getMenu=(state:State)=>state.menu;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
  });
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});