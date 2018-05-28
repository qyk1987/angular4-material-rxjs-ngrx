import { Student } from "../domain";
import * as actions from '../actions/student.action';
import * as searchActions from '../actions/search.action';
import * as orderActions from '../actions/order.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Student};
    selectedId:string|null;
    key:string|null;
};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
    key:null
};

const updateStudent=(state,action)=>{
    return updateOne(state, action.payload);
}

const addStudent=(state,action)=>{
    const student=action.payload;
    if(state.entities[student.Id]){
        return state;
    }
    const newIds=[... state.ids,student.Id];
    const newEntities={... state.entities,[student.Id]:student};
    return {... state,ids:newIds,entities:newEntities};
}

const delStudent=(state,action)=>{
    const student = action.payload;
    const ids = state.ids.filter(id => id !== student.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: student.Id === state.selectedId ? null : state.selectedId,
        key:state.key
      };
}

const delAllStudents=(state,action)=>{
    return {
        ids: [],
        entities: {},
        selectedId:null,
        key:state.key
      };
}

const loadStudents=(state,action)=>{
    const students=action.payload;
   
    if (students===null||students.length<=0) {
        return state;
      }
    const incomingIds=students.map(p=>p.Id);
    const incomingEntities=_.chain(students)
          .keyBy('Id')
          .mapValues(o=>o)
          .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
          return {
              ids:[...incomingIds],
              entities:{...incomingEntities},
              selectedId:null,
              key:state.key
          }
    }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
          ids:[...incomingIds,...oldIds],
          entities:{...oldEntities,...incomingEntities},
          selectedId:null,
          key:state.key
    }
   
} 

const loadresult=(state,action)=>{
    const students=action.payload.Data;
   
    if (students===null||students.length<=0) {
        return state;
      }
      const incomingIds=students.map(p=>p.Id);
      const incomingEntities=_.chain(students)
            .keyBy('Id')
            .mapValues(o=>o)
            .value();
      const oldIds=_.difference(state.ids,incomingIds);
      if (oldIds.length === 0) {
            return {
                ids:[...incomingIds],
                entities:{...incomingEntities},
                selectedId:null,
                key:state.key
            }
      }
      const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
      return {
            ids:[...incomingIds,...oldIds],
            entities:{...oldEntities,...incomingEntities},
            selectedId:null,
            key:state.key
      }


 
} 
const setKey=(state,action)=>{
    const selectstate=action.payload;
    if(selectstate.state<0){
        return{...state,key:selectstate.key};
    }
    return{...state,key:selectstate.key};
   
} 

const loadStudentByOrder=(state,action)=>{
    const orders=action.payload.Data[0].orders;
    if (orders === null) {
        return state;
      }
    const students=orders.map(o=>o.Student);
    const incomingIds=students.map(p=>p.Id);
    const incomingEntities=_.chain(students)
          .keyBy('Id')
          .mapValues(o=>o)
          .value();
    const oldIds=_.difference(state.ids,incomingIds);
    if (oldIds.length === 0) {
          return {
              ids:[...incomingIds],
              entities:{...incomingEntities},
              selectedId:null,
              key:state.key
          }
    }
    const oldEntities=oldIds.reduce((entities,id:string)=>({...entities,[id]:state.entities[id]}),{});
    return {
          ids:[...incomingIds,...oldIds],
          entities:{...oldEntities,...incomingEntities},
          selectedId:null,
          key:state.key
    }


 
} 


export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addStudent(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delStudent(state,action);
        }
        case actions.ActionTypes.UPLOAD_CARD_SUCCESS:
        case actions.ActionTypes.UPDATE_SERVICE_SUCCESS:
        case actions.ActionTypes.UPLOAD_IMG_SUCCESS:
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateStudent(state,action);
        }
        case actions.ActionTypes.LOAD_BY_FILTER:{
            return setKey(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CLASS_SUCCESS:
        case actions.ActionTypes.LOAD_BY_FILTER_SUCCESS:{
            return loadresult(state,action);
        }
        case actions.ActionTypes.LOAD_BY_INTOR_SUCCESS:
        case actions.ActionTypes.SEARCH_LIKE_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadStudents(state,action);
        }
        case orderActions.ActionTypes.LOAD_BY_POST_SUCCESS:{
            return loadStudentByOrder(state,action);
        }
        case searchActions.ActionTypes.CHANGE:
        case searchActions.ActionTypes.CLEAR:{
            return delAllStudents(state,action);
        }
        case actions.ActionTypes.SELECT:{
            return {... state,selectedId:(<Student>action.payload).Id};
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