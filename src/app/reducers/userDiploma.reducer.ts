import { UserDiploma } from "../domain";
import * as actions from '../actions/userDiploma.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:UserDiploma};

};

export const initialState: State = {
    ids:[],
    entities:{}
};

const updateUserDiploma=(state,action)=>{
    const userDiploma=action.payload;
    const entities = {...state.entities, [userDiploma.Id]: userDiploma};
    return {...state, entities: entities};
}

const addUserDiploma=(state,action)=>{
    const userDiploma=action.payload;
    if(state.entities[userDiploma.Id]){
        return state;
    }
    const newIds=[... state.ids,userDiploma.Id];
    const newEntities={... state.entities,[userDiploma.Id]:userDiploma};
    return {... state,ids:newIds,entities:newEntities};
}

const delUserDiploma=(state,action)=>{
    const userDiploma = action.payload;
    const ids = state.ids.filter(id => id !== userDiploma.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
      };
}

const loadUserDiplomas=(state,action)=>{
    const userDiplomas=action.payload;
   
    if (userDiplomas === null) {
        return state;
      }
    const incomingIds=userDiplomas.map(p=>p.Id);
    const newIds=_.difference(incomingIds,state.ids);
    if (newIds.length === 0) {
        return state;
      }
    const incomingEntities=_.chain(userDiplomas)
        .keyBy('Id')
        .mapValues(o=>o)
        .value();
    const newEntities=newIds.reduce((entities,id:string)=>({...entities,[id]:incomingEntities[id]}),{});
    return {
        ids:[...state.ids,...newIds],
        entities:{...state.entities,...newEntities}
    }


 
} 


export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.ADD_SUCCESS:{
            return addUserDiploma(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delUserDiploma(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateUserDiploma(state,action);
        }
        case actions.ActionTypes.LOAD_BY_STUDENT_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadUserDiplomas(state,action);
        }
        default: {
            return state;
        }
    }
}

export const getIds=(state:State)=>state.ids;
export const getEntities=(state:State)=>state.entities;
export const getAll=createSelector(getIds,getEntities,(ids,entities)=>{
    return ids.map(id=>entities[id]);
});