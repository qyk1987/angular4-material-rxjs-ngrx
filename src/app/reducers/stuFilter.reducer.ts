import { StuFilter } from "../domain";
import * as actions from '../actions/stuFilter.action';
import * as srcActions from '../actions/student.action';
import * as _ from 'lodash';
import { createSelector } from "reselect";
export interface State {
    entity:StuFilter

};

export const initialState: State = {
    entity:{
        postIds:[],
        gradeIds:[],
        introIds:[],
        majorIds:[],
        schoolIds:[],
        eduIds:[]
    }
};




const changeStuFilter=(state,action)=>{
    const stuFilter=action.payload;
   
    if (stuFilter === null) {
        return state;
      }

    return {...state,entity:stuFilter};


 
} 
const clearStuFilter=(state,action)=>{
   const stuFilter={
        postIds:[],
        gradeIds:[],
        introIds:[],
        majorIds:[],
        schoolIds:[],
        eduIds:[]
    }
    return {...state,entity:stuFilter}; 
} 


export function reducer(state = initialState, action:actions.Actions ): State {
    switch (action.type) { 
        case actions.ActionTypes.CHANGE:{
            return changeStuFilter(state,action);
        }
        case actions.ActionTypes.CLEAR:{
            return clearStuFilter(state,action);
        }
        default: {
            return state;
        }
    }
}

export const getEntity=(state:State)=>state.entity;
