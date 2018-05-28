import { Order } from "../domain";
import * as actions from '../actions/order-detail.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
import {covertArrToObj, buildObjFromArr,updateOne,} from '../utils/reduer.util';
import {OrderDetailVM} from "../vm";
export interface State {
    ids:string[];
    entities:{[id:string]:OrderDetailVM};
    selectedId:string|null;

};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null,
};


const loadDetailsByPage=(state,action)=>{
    const coupons=action.payload.Data;
   
    if (coupons === null) {
        return state;
      }
    const incomingIds=coupons.map(p=>p.Id);
    const incomingEntities=_.chain(coupons)
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


// const updateKey=(state,action)=>{
//     const key=action.payload;
//     return{...state,key:key.key};
   
// } 
export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
    //    case actions.ActionTypes.LOAD_BY_DATE:{
    //     return updateKey(state,action);
    //    }
        case actions.ActionTypes.LOAD_BY_DATE_SUCCESS:
        //case actions.ActionTypes.SEARCH_LIKE_SUCCESS:
        {
            return loadDetailsByPage(state,action);
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

