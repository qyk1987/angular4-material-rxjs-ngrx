import { Post } from "../domain";
import * as actions from '../actions/post.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Post};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updatePost=(state,action)=>{
    const post=action.payload;
    
    return updateOne(state,post);
}

const addPost=(state,action)=>{
    const post=action.payload;
    if(state.entities[post.Id]){
        return state;
    }
    const newIds=[... state.ids,post.Id];
    const newEntities={... state.entities,[post.Id]:post};
    return {... state,ids:newIds,entities:newEntities};
}

const delPost=(state,action)=>{
    const post = action.payload;
    const ids = state.ids.filter(id => id !== post.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: post.Id === state.selectedId ? null : state.selectedId
      };
}



const loadPostsByPage=(state,action)=>{
    const posts=action.payload.Data;
   
    if (posts === null) {
        return state;
      }
    const incomingIds=posts.map(p=>p.Id);
    const incomingEntities=_.chain(posts)
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

const loadPosts=(state,action)=>{
    const posts=action.payload;
   
    if (posts === null) {
        return state;
      }
    const incomingIds=posts.map(p=>p.Id);
    const incomingEntities=_.chain(posts)
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
            return addPost(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delPost(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updatePost(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadPostsByPage(state,action);
        }
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadPosts(state,action);
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