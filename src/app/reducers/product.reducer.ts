import { Product } from "../domain";
import * as actions from '../actions/product.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
export interface State {
    ids:string[];
    entities:{[id:string]:Product};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};

const updateProduct=(state,action)=>{
    const product=action.payload;
    
    return updateOne(state,product);
}

const addProduct=(state,action)=>{
    const product=action.payload;
    if(state.entities[product.Id]){
        return state;
    }
    const newIds=[... state.ids,product.Id];
    const newEntities={... state.entities,[product.Id]:product};
    return {... state,ids:newIds,entities:newEntities};
}

const delProduct=(state,action)=>{
    const product = action.payload;
    const ids = state.ids.filter(id => id !== product.Id);
    if (ids.length === 0) {
      return state;
    }
    const newEntities = buildObjFromArr(ids, state.entities);
    return {
        ids: ids,
        entities: newEntities,
        selectedId: product.Id === state.selectedId ? null : state.selectedId
      };
}
const delAllProducts=(state,action)=>{
    return {
        ids: [],
        entities: {},
        selectedId:null
      };
}

const loadProducts=(state,action)=>{
    // const products=action.payload;
   
    // if (products === null) {
    //     return state;
    //   }
    // const incomingIds=products.map(p=>p.Id);
    // const newIds=_.difference(incomingIds,state.ids);
    // if (newIds.length === 0) {
    //     return state;
    //   }
    // const incomingEntities=_.chain(products)
    //     .keyBy('Id')
    //     .mapValues(o=>o)
    //     .value();
    // const newEntities=newIds.reduce((entities,id:string)=>({...entities,[id]:incomingEntities[id]}),{});
    // return {
    //     ids:[...state.ids,...newIds],
    //     entities:{...state.entities,...newEntities},
    //     selectedId:null
    // }

    const products=action.payload;
    if (products === null) {
        return state;
      }
    const incomingIds=products.map(p=>p.Id);
    const incomingEntities=_.chain(products)
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
const loadProductsByPage=(state,action)=>{
    const products=action.payload.Data;
   
    if (products === null) {
        return state;
      }
    const incomingIds=products.map(p=>p.Id);
    const incomingEntities=_.chain(products)
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
            return addProduct(state,action);
        }
        case actions.ActionTypes.DELETE_SUCCESS:{
            return delProduct(state,action);
        }
        case actions.ActionTypes.UPDATE_SUCCESS:{
            return updateProduct(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CAMPUS:{
            return delAllProducts(state,action);
        }
        case actions.ActionTypes.LOAD_BY_CAMPUS_SUCCESS:
        case actions.ActionTypes.LOAD_BY_SUBJECT_SUCCESS:
        case actions.ActionTypes.LOAD_SUCCESS:{
            return loadProducts(state,action);
        }
        case actions.ActionTypes.LOAD_BY_PAGE_SUCCESS:{
            return loadProductsByPage(state,action);
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