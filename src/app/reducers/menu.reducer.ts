import { Menu } from "../domain";
import * as actions from '../actions/menu.action';
import * as srcActions from '../actions/student.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
export interface State {
    menu:Menu[];
    level:number;
    id:string;
};

export const initialState: State = {
    menu:[],
    level:-1,
    id:'0'
};




const changeMenu=(state,action)=>{
    const menu=action.payload;
   
    if (menu === null) {
        return state;
      }

    return {...state,menu:menu};


 
} 
const select=(state,action)=>{
    const data=action.payload;
   

    return {...state,id:data.id,level:data.level};


 
} 


export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.LOAD_CATEGORY_SUCCESS:
        case actions.ActionTypes.LOAD_DISTRICT_SUCCESS:{
            return changeMenu(state,action);
        }
        case actions.ActionTypes.SELECT:{
            return select(state,action);
        }
        default: {
            return state;
        }
    }
}

export const getMenu=(state:State)=>state.menu;
export const getId=(state:State)=>state.id;
export const getLevel=(state:State)=>state.level;

