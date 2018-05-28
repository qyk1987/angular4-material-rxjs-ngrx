import * as actions from '../actions/search.action';
import * as stuActions from '../actions/student.action';
export interface State {
       key:string;
};

export const initialState: State = {
    key:""
};

export function reducer(state = initialState, action:actions.Actions): State {
    switch (action.type) {
        case actions.ActionTypes.CHANGE: 
        case actions.ActionTypes.CHANGE_LIKE:{
            return {...state,key:<string>action.payload};
        }
        case stuActions.ActionTypes.LOAD_BY_FILTER:
        case stuActions.ActionTypes.LOAD_BY_INTOR:
        case stuActions.ActionTypes.LOAD:
        case actions.ActionTypes.CLEAR: {
            return {...state,key:""};
        }
        default: {
            return {...state};
        }
    }
}

export const getKey=(state:State)=>state.key;
