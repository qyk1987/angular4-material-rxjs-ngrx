
import * as actions from '../actions/page.action';
import * as stuActions from '../actions/student.action';
import * as ordActions from '../actions/order.action';
import * as recActions from '../actions/receipt.action';
import * as rschActions from '../actions/school.action';
import * as serActions from '../actions/service.action';
import * as userActions from '../actions/user.action';
import * as disActions from '../actions/district.action';
import * as camActions from '../actions/campus.action';
import * as spotActions from '../actions/spot.action';
import * as postActions from '../actions/post.action';
import * as prdActions from '../actions/product.action';
import * as couActions from '../actions/coupon.action';
import * as dipActions from '../actions/diploma.action';
import * as detActions from '../actions/order-detail.action';
import * as claActions from '../actions/class.action';
import {Page} from '../domain/page.model';
export interface State {
       page:Page;
       ids:string[];
};

export const initialState: State = {
    page:{
        pageSize:10,
        currentPage:1,
        count:0,
        order:'Id',
        isAsc:true,
    },
    ids:null
};
// const setToPage=(state,action)=>{
//     const index=action.payload;

//     return {
//         page:{...state.page,toPage:index}
//     }

// }

const setcurrent=(state,action)=>{
    const count=action.payload.Count;
    const currentPage=action.payload.CurrentPage;
    const order=action.payload.Order;
    const isAsc=action.payload.IsAsc;
    const pageSize=action.payload.PageSize;
    const data=action.payload.Data;
        return {
            page:{...state.page,currentPage:currentPage,count:count,order:order,isAsc:isAsc,pageSize:pageSize},
            ids:data===null?null:data.map(d=>d.Id)
        }
}

const setcurrentForOrder=(state,action)=>{
    const count=action.payload.Count;
    const currentPage=action.payload.CurrentPage;
    const order=action.payload.Order;
    const isAsc=action.payload.IsAsc;
    const pageSize=action.payload.PageSize;
    const data=action.payload.Data[0].orders;
        return {
            page:{...state.page,currentPage:currentPage,count:count,order:order,isAsc:isAsc,pageSize:pageSize},
            ids:data===null?null:data.map(d=>d.Id)
        }
}
const minusCount=(state,action)=>{
    const obj=action.payload;
        return {
            page:{...state.page,count:state.page.count-1},
            ids:state.ids===null?null:state.ids.filter(id=>id!==obj.Id)
        }
}
const addCount=(state,action)=>{
    const obj=action.payload;
    return {
        page:{...state.page,count:state.page.count+1},
        ids:state.ids===null?[obj.Id]:[...state.ids.filter(id=>id!==obj.Id),obj.Id]
    }
}
const sort=(state,action)=>{
    const sort=action.payload;
    return state;
    // if(index<=state.page.totalPage&&index>=1){
    //     return {
    //         page:{...state.page,currentPage:index}
    //     }
    // }else{
    //     return state;
    // }
}
export function reducer(state = initialState, action:actions.PageActions): State {
    switch (action.type) {
        case actions.ActionTypes.LOAD: {//页码组件构造时导入初始数据
            return {...state,page:<Page>action.payload};
        }
        case recActions.ActionTypes.LOAD_BY_POST_SUCCESS:
        case postActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case stuActions.ActionTypes.LOAD_BY_FILTER_SUCCESS:
        case stuActions.ActionTypes.LOAD_BY_CLASS_SUCCESS:
        case rschActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case serActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case userActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case dipActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case prdActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case couActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        case detActions.ActionTypes.LOAD_BY_DATE_SUCCESS:
        case claActions.ActionTypes.LOAD_BY_PAGE_SUCCESS:
        {//当获取数据成功是、时 带回总数目并写入store
            return setcurrent(state,action);
        }
        case ordActions.ActionTypes.LOAD_BY_POST_SUCCESS:
        {
            return setcurrentForOrder(state,action);
        }
        // case actions.ActionTypes.SET: {//当点击切换页码是设置要获取的页码
        //     return setToPage(state,action);
        // }
        // case actions.ActionTypes.REFRESH: { //当搜索时关键词改变  重新回归到第一页
        //     return refresh(state,action);
        // }
        //case ordActions.ActionTypes.ADD_COMPENSATION_SUCCESS:
        //case ordActions.ActionTypes.UPDATE_STATE_SUCCESS:
        //case ordActions.ActionTypes.DELETE_SUCCESS:
        //case ordActions.ActionTypes.DELETE_COMPENSATION_SUCCESS:
        case recActions.ActionTypes.DELETE_SUCCESS:
        case recActions.ActionTypes.UPDATE_SUCCESS:
        case postActions.ActionTypes.DELETE_SUCCESS:
        case stuActions.ActionTypes.DELETE_SUCCESS:
        case rschActions.ActionTypes.DELETE_SUCCESS:
        case serActions.ActionTypes.DELETE_SUCCESS:
        case userActions.ActionTypes.DELETE_SUCCESS:
        case dipActions.ActionTypes.DELETE_SUCCESS:
        case prdActions.ActionTypes.DELETE_SUCCESS:
        case couActions.ActionTypes.DELETE_SUCCESS:
        case claActions.ActionTypes.DELETE_SUCCESS:
        {
            return minusCount(state,action);
        }
        case recActions.ActionTypes.ADD_SUCCESS:
        case postActions.ActionTypes.ADD_SUCCESS:
        case stuActions.ActionTypes.ADD_SUCCESS:
        case rschActions.ActionTypes.ADD_SUCCESS:
        case serActions.ActionTypes.ADD_SUCCESS:
        case userActions.ActionTypes.ADD_SUCCESS:
        case prdActions.ActionTypes.ADD_SUCCESS:
        case dipActions.ActionTypes.ADD_SUCCESS:
        case couActions.ActionTypes.ADD_SUCCESS:
        case claActions.ActionTypes.ADD_SUCCESS:
        {
            return addCount(state,action);
        }
        case actions.ActionTypes.SORT: {
            return sort(state,action);
        }
        default: {
            return state;
        }
    }
}

export const getPage=(state:State)=>state.page;
export const getIds=(state:State)=>state.ids;
