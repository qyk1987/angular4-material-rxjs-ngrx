import * as actions from '../actions/quote.action';
import {Quote} from '../domain/quote.model';
export interface State {
       quote:Quote;
};

export const initialState: State = {
    quote:{
        "cn": "我总是对新的一天充满喜悦，这是一次新的尝试、一个新的开始，翘首以待，黎明之后或是惊喜。（约翰·博因顿·普里斯特利）",
        "en": "I have always been delighted at the prospect of a new day, a fresh try, one more start, with perhaps a bit of magic waiting somewhere behind the morning.",
        "pic": "/assets/img/quotes/9.jpg",
      }
};

export function reducer(state = initialState, action:actions.QuoteActions): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD_SUCCESS: {
            return {...state,quote:<Quote>action.payload};
        }
        case actions.ActionTypes.LOAD_FAIL: 
        default: {
            return state;
        }
    }
}

export const getQuote=(state:State)=>state.quote;
