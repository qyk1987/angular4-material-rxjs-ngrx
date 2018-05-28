import { NgModule } from '@angular/core';
/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import uuid from 'node-uuid';
/**
 * storeFreeze 用于防止 state 被修改，在 Redux 中我们必须确保 state 是不可更改的，这个函数
 * 有助于帮我们检测 state 是否被有意或无意的修改了。当 state 发生修改时，会抛出一个异常，这一点
 * 在开发时非常有帮助。根据环境变量的值，发布时会不包含这个函数。
 */
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { createSelector } from 'reselect'
import { Auth, RoleList, Order } from '../domain';
/**
 * compose 函数是一个很方便的工具，简单来说，它接受任意数量的函数作为参数，然后返回一个新的函数。
 * 这个新的函数其实就是前面的函数的叠加，比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数
 * 就是 `g(f(x))`。
 */
import { compose } from '@ngrx/core/compose';
import * as authActions from '../actions/auth.action';
import * as cartActions from '../actions/cart.action';
import * as orderActions from '../actions/order.action';
import { covertArrToObj, buildObjFromArr, updateOne, sortBy, chinaDate } from '../utils/reduer.util';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
/**
 * 分别从每个 reducer 中将需要导出的函数或对象进行导出，并起个易懂的名字
 */
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromUser from './user.reducer';
import * as fromTheme from './theme.reducer';
import * as fromStudent from './student.reducer';
import * as fromSchool from './school.reducer';
import * as fromDiploma from './diploma.reducer';
import * as fromUserDiploma from './userDiploma.reducer';
import * as fromStuFilter from './stuFilter.reducer';
import * as fromSearch from './search.reducer';
import * as fromDistrict from './district.reducer';
import * as fromCampus from './campus.reducer';
import * as fromSpot from './spot.reducer';
import * as fromCategory from './category.reducer';
import * as fromSubject from './subject.reducer';
import * as fromProduct from './product.reducer';
import * as fromCoupon from './coupon.reducer';
import * as fromService from './service.reducer';
import * as fromCart from './cart.reducer';
import * as fromOrder from './order.reducer';
import * as fromPage from './page.reducer';
import * as fromReceipt from './receipt.reducer';
import * as fromMenu from './menu.reducer';
import * as fromPost from './post.reducer';
import * as fromRole from './role.reducer';
import * as fromCompensation from './compensation.reducer';
import * as fromDetail from './order-detail.reducer';
import * as fromClass from './class.reducer';
import { unique } from '../utils/reduer.util';
import { parse } from 'date-fns';
/**
 * 正如我们的 reducer 像数据库中的表一样，我们的顶层 state 也包含各个子 reducer 的 state
 * 并且使用一个 key 来标识各个子 state
 */
export interface State {
    quote: fromQuote.State;
    auth: Auth;
    user: fromUser.State,
    theme: fromTheme.State;
    router: fromRouter.RouterState;
    students: fromStudent.State,
    schools: fromSchool.State,
    diplomas: fromDiploma.State,
    userDiplomas: fromUserDiploma.State,
    stuFilter: fromStuFilter.State,
    search: fromSearch.State,
    district: fromDistrict.State,
    campus: fromCampus.State,
    spot: fromSpot.State,
    category: fromCategory.State,
    subject: fromSubject.State,
    product: fromProduct.State,
    coupon: fromCoupon.State,
    service: fromService.State,
    cart: fromCart.State,
    order: fromOrder.State,
    page: fromPage.State,
    receipt: fromReceipt.State,
    menu: fromMenu.State,
    post: fromPost.State,
    role: fromRole.State,
    compensation: fromCompensation.State,
    orderDetail: fromDetail.State,
    classes: fromClass.State

};

const initialState: State = {
    quote: fromQuote.initialState,
    auth: fromAuth.initialState,
    user: fromUser.initialState,
    theme: fromTheme.initialState,
    router: fromRouter.initialState,
    students: fromStudent.initialState,
    schools: fromSchool.initialState,
    diplomas: fromDiploma.initialState,
    userDiplomas: fromUserDiploma.initialState,
    stuFilter: fromStuFilter.initialState,
    search: fromSearch.initialState,
    district: fromDistrict.initialState,
    campus: fromCampus.initialState,
    spot: fromSpot.initialState,
    category: fromCategory.initialState,
    subject: fromSubject.initialState,
    product: fromProduct.initialState,
    coupon: fromCoupon.initialState,
    service: fromService.initialState,
    cart: fromCart.initialState,
    order: fromOrder.initialState,
    page: fromPage.initialState,
    receipt: fromReceipt.initialState,
    menu: fromMenu.initialState,
    post: fromPost.initialState,
    role: fromRole.initialState,
    compensation: fromCompensation.initialState,
    orderDetail: fromDetail.initialState,
    classes: fromClass.initialState

};

const reducers = {
    quote: fromQuote.reducer,
    auth: fromAuth.reducer,
    user: fromUser.reducer,
    theme: fromTheme.reducer,
    router: fromRouter.routerReducer,
    students: fromStudent.reducer,
    schools: fromSchool.reducer,
    diplomas: fromDiploma.reducer,
    userDiplomas: fromUserDiploma.reducer,
    stuFilter: fromStuFilter.reducer,
    search: fromSearch.reducer,
    district: fromDistrict.reducer,
    campus: fromCampus.reducer,
    spot: fromSpot.reducer,
    category: fromCategory.reducer,
    subject: fromSubject.reducer,
    product: fromProduct.reducer,
    coupon: fromCoupon.reducer,
    service: fromService.reducer,
    cart: fromCart.reducer,
    order: fromOrder.reducer,
    page: fromPage.reducer,
    receipt: fromReceipt.reducer,
    menu: fromMenu.reducer,
    post: fromPost.reducer,
    role: fromRole.reducer,
    compensation: fromCompensation.reducer,
    orderDetail: fromDetail.reducer,
    classes: fromClass.reducer
};


const majors = { 0: "经济类", 1: "工科类", 2: "管理类", 3: "理科类", 4: "教育类", 5: "医学类" };
const educations = { 0: "高中", 1: "专科", 2: "本科", 3: "研究生", 4: "博士" };
const grades = { "2013": "2013级", "2014": "2014级", "2015": "2015级", "2016": "2016级", "2017": "2017级", "2018": "2018级" };
const nations = { 0: "汉族", 1: "蒙古族", 2: "回族", 3: "藏族", 4: "维吾尔族" };
const channels={0:'支付宝', 1:'微信', 2:'现金', 3:'银行卡', 4:'信用卡',5:'农商服务部二维码',6:'其他'}
const menuitems = [
    {
        id: 1,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "学员管理",
        lists: [
            {
                name: "学员信息",
                link: "/student"
            },

        ],
        roleids: [
            '00f76f26-ab8d-4e03-9cfd-23d706f4060f',
            '12bc16f2-5274-4b6c-a56f-b06d16bf11e0',
            '12fd21b9-4eac-4ae9-a6f8-d8c085f8ddd4',
            '173c0c90-c96b-45d7-9f6e-a1d3300e3f5e',
            '30894d59-fd10-466d-88ad-7bc9e1772c4f',
            '38694238-0dd0-44b6-8fe9-e83d310a4f59',
            '88305d4e-4ca1-45c7-a2cb-a9b9896b17d2',
            '93007258-954a-4938-9f46-203ef3b4dac5',
            'f105106d-b14a-4bdf-981b-9c62bebd3391'
        ]
    },
    {
        id: 2,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "订单管理",
        lists: [
            {
                name: "产品列表",
                link: "/productList"
            },
            {
                name: "结账信息",
                link: "/squreAccounts"
            },
            {
                name: "数据分析",
                link: "/dataAnalyse"
            },
            {
                name: "详细清单",
                link: "/orderlist"
            }
        ],
        roleids: ['12fd21b9-4eac-4ae9-a6f8-d8c085f8ddd4']
    },
    {
        id: 3,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "财务管理",
        lists: [
            {
                name: "订单结账",
                link: "/check"
            },
            {
                name: "财务报表",
                link: "/report"
            }

        ],
        roleids: ['88305d4e-4ca1-45c7-a2cb-a9b9896b17d2']
    },
    {
        id: 4,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "基本设置",
        lists: [
            {
                name: "学校管理",
                link: "/school"
            },
            {
                name: "机构管理",
                link: "/organization"
            },
            {
                name: "服务管理",
                link: "/service"
            },
            {
                name: "产品管理",
                link: "/productadmin"
            },
            {
                name: "优惠券管理",
                link: "/coupon"
            },
            {
                name: "证书管理",
                link: "/diploma"
            },

        ],
        roleids: ['173c0c90-c96b-45d7-9f6e-a1d3300e3f5e', '93007258-954a-4938-9f46-203ef3b4dac5']
    },
    {
        id: 5,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "人员管理",
        lists: [
            {
                name: "人员信息",
                link: "/user"
            }

        ],
        roleids: ['173c0c90-c96b-45d7-9f6e-a1d3300e3f5e', '93007258-954a-4938-9f46-203ef3b4dac5', '00f76f26-ab8d-4e03-9cfd-23d706f4060f',
            '38694238-0dd0-44b6-8fe9-e83d310a4f59']
    },
    {
        id: 6,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "业绩管理",
        lists: [
            {
                name: "业绩报表",
                link: "/report"
            },
            {
                name: "订单查询",
                link: "/orderlist"
            }

        ],
        roleids: ['00f76f26-ab8d-4e03-9cfd-23d706f4060f', '173c0c90-c96b-45d7-9f6e-a1d3300e3f5e', '38694238-0dd0-44b6-8fe9-e83d310a4f59', '93007258-954a-4938-9f46-203ef3b4dac5'
        ]
    },
    {
        id: 7,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "教务管理",
        lists: [
            {
                name: "班级管理",
                link: "/classlist"
            }

        ],
        roleids: ['BB2B2A55-2B3B-42CC-A299-11DF62BEE19A', '93007258-954a-4938-9f46-203ef3b4dac5'
        ]
    },
    {
        id: 8,
        isopen: false,
        icon: {
            issvg: true,
            icon: "projects"
        },
        name: "班级管理",
        lists: [
            {
                name: "我的班级",
                link: "/classlist"
            }

        ],
        roleids: ['30894d59-fd10-466d-88ad-7bc9e1772c4f'
        ]
    }

];
const imgPath = "http://p1szdp1zg.bkt.clouddn.com/fyimg/";
const cardPath = "http://p1szdp1zg.bkt.clouddn.com/fycard/";
const cssPath = "http://image.xueqitian.com/";
//reducer字典
/**
 * 使用 combineReducers 把所有子 reducer 合并产生一个顶级 reducer
 */
const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmetReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);//合并reducer

export function reducer(state: any, action: any) {
    if (action.type === authActions.ActionTypes.LOGOUT_SUCCESS) {
        return initialState;
    }
    if (action.type === cartActions.ActionTypes.CHANGESET) {
        return changeCarts(state, action);
    }
    if (action.type === orderActions.ActionTypes.CHECK_CART) {
        return checkCarts(state, action);
    }
    if (environment.production) {
        return productionReducers(state, action);
    } else {
        return developmetReducers(state, action);
    }
}


/**
 * 获取各个子状态
 */
export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getUserState = (state: State) => state.user;
export const getRoleState = (state: State) => state.role;
export const getRouterState = (state: State) => state.router;
export const getThemeState = (state: State) => state.theme;
export const getStudentsState = (state: State) => state.students;
export const getSchoolsState = (state: State) => state.schools;
export const getDiplomasState = (state: State) => state.diplomas;
export const getUserDiplomasState = (state: State) => state.userDiplomas;
export const getStuFilterState = (state: State) => state.stuFilter;
export const getSearchState = (state: State) => state.search;
export const getDistrictState = (state: State) => state.district;
export const getCampusState = (state: State) => state.campus;
export const getSpotState = (state: State) => state.spot;
export const getCategoryState = (state: State) => state.category;
export const getSubjectState = (state: State) => state.subject;
export const getProductState = (state: State) => state.product;
export const getCouponState = (state: State) => state.coupon;
export const getServiceState = (state: State) => state.service;
export const getCartState = (state: State) => state.cart;
export const getOrderState = (state: State) => state.order;
export const getPageState = (state: State) => state.page;
export const getReceiptState = (state: State) => state.receipt;
export const getMenuState = (state: State) => state.menu;
export const getPostState = (state: State) => state.post;
export const getCompensationState = (state: State) => state.compensation;
export const getOrderDetailState = (state: State) => state.orderDetail;
export const getClassState = (state: State) => state.classes;
/**
 * 获取各个子状态中存储的对象
 */
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getUsers = createSelector(getUserState, fromUser.getAll);
export const getRoles = createSelector(getRoleState, fromRole.getAll);
export const getTheme = createSelector(getThemeState, fromTheme.getTheme);
export const getStudents = createSelector(getStudentsState, fromStudent.getAll);
export const getSchools = createSelector(getSchoolsState, fromSchool.getAll);
export const getDiplomas = createSelector(getDiplomasState, fromDiploma.getAll);
export const getUserDiplomas = createSelector(getUserDiplomasState, fromUserDiploma.getAll);
export const getStuFilter = createSelector(getStuFilterState, fromStuFilter.getEntity);
export const getKey = createSelector(getSearchState, fromSearch.getKey);
export const getDistricts = createSelector(getDistrictState, fromDistrict.getAll);
export const getCampuses = createSelector(getCampusState, fromCampus.getAll);
export const getSpots = createSelector(getSpotState, fromSpot.getAll);
export const getCategorys = createSelector(getCategoryState, fromCategory.getAll);
export const getSubjects = createSelector(getSubjectState, fromSubject.getAll);
export const getProducts = createSelector(getProductState, fromProduct.getAll);
export const getCoupons = createSelector(getCouponState, fromCoupon.getAll);
export const getCouponSelectState = createSelector(getCouponState, fromCoupon.getSelectState);
export const getServices = createSelector(getServiceState, fromService.getAll);
export const getCarts = createSelector(getCartState, fromCart.getAll);
export const getOrders = createSelector(getOrderState, fromOrder.getByState);
export const getStatistic = createSelector(getOrderState, fromOrder.getStatistic);
export const getPage = createSelector(getPageState, fromPage.getPage);
export const getPageIds = createSelector(getPageState, fromPage.getIds);
export const getReceipts = createSelector(getReceiptState, fromReceipt.getByState);
export const getMenu = createSelector(getMenuState, fromMenu.getMenu);
export const getMenuId = createSelector(getMenuState, fromMenu.getId);
export const getMenuLevel = createSelector(getMenuState, fromMenu.getLevel);
export const getPosts = createSelector(getPostState, fromPost.getAll);
export const getCompensations = createSelector(getCompensationState, fromCompensation.getAll);
export const getOrderDetails = createSelector(getOrderDetailState, fromDetail.getAll);
export const getClasses = createSelector(getClassState, fromClass.getAll);
export const getClassMenu = createSelector(getClassState, fromClass.getMenu);
/**
 * 获取各个子状态中存储的字典实体 便于查询
 */
const getSelectedStudentId = createSelector(getStudentsState, fromStudent.getSelectedId);
const getSelectedCategoryId = createSelector(getCategoryState, fromCategory.getSelectedId);
const getSelectedClassId = createSelector(getClassState, fromClass.getSelectedId);
const getSelectedCartId = createSelector(getCartState, fromCart.getSelectedId);
const getCurrentAuth = createSelector(getAuthState, fromAuth.getAuth);
const getStudentsEntities = createSelector(getStudentsState, fromStudent.getEntities);
const getSchoolsEntities = createSelector(getSchoolsState, fromSchool.getEntities);
const getUserEntities = createSelector(getUserState, fromUser.getEntities);
const getRoleEntities = createSelector(getRoleState, fromRole.getEntities);
const getDiplomasEntities = createSelector(getDiplomasState, fromDiploma.getEntities);
const getUserDiplomasEntities = createSelector(getUserDiplomasState, fromUserDiploma.getEntities);
const getDistrictsEntities = createSelector(getDistrictState, fromDistrict.getEntities);
const getCampusesEntities = createSelector(getCampusState, fromCampus.getEntities);
const getSpotsEntities = createSelector(getSpotState, fromSpot.getEntities);
const getCategorysEntities = createSelector(getCategoryState, fromCategory.getEntities);
const getSubjectsEntities = createSelector(getSubjectState, fromSubject.getEntities);
const getProductsEntities = createSelector(getProductState, fromProduct.getEntities);
const getCouponsEntities = createSelector(getCouponState, fromCoupon.getEntities);
const getServicesEntities = createSelector(getServiceState, fromService.getEntities);
const getCartsEntities = createSelector(getCartState, fromCart.getEntities);
const getOrdersEntities = createSelector(getOrderState, fromOrder.getEntities);
const getReceiptsEntities = createSelector(getReceiptState, fromReceipt.getEntities);
const getPostEntities = createSelector(getPostState, fromPost.getEntities);
const getCompensationEntities = createSelector(getCompensationState, fromCompensation.getEntities);
const getOrderDetailEntities = createSelector(getOrderDetailState, fromDetail.getEntities);
const getClassEntities = createSelector(getClassState, fromClass.getEntities);
//获取任务机器关联的user
// export const getTasksWithOwners=createSelector(getTasks,getUserEntities,(tasks,userEntities)=>{
//     return tasks.map(task=>{
//         return {
//             ...task,
//             owner:userEntities[task.ownerId],
//             participants:task.participantIds.map(id=>userEntities[id])
//         };
//     } );
// });



//获取当前登录者的信息
export const getAuth = getCurrentAuth;
export const getChannels =createSelector(getAuth,(auth)=>{
    return channels;
});
export const getSelectedPost = createSelector(getAuth, (auth) => {
    if (auth !== null && auth.dutys !== null) {
        return auth.dutys[auth.currentDutyId];
    } else {
        return null;
    }

});

//根据登录者获取对应的菜单
export const getmenuitems = createSelector(getSelectedPost,
    (auth) => {
        if (auth && auth !== null) {
            const roleid = auth.RoleId;
            return menuitems.filter(m => m.roleids.indexOf(roleid) > -1);
        } else {
            return menuitems;
        }

    });
export const getAuthWithInfos = createSelector(getAuth, getDistrictsEntities, getCampusesEntities,
    getSpotsEntities, getRoleEntities, (auth, districtEntities, campusEntities, spotEntities, roleEntities) => {
        for (var key in auth.dutys) {
            auth.dutys[key] = {
                ...auth.dutys[key],
                RoleName: roleEntities[auth.dutys[key].RoleId] ? roleEntities[auth.dutys[key].RoleId].Name : null,
                RoleLabel: roleEntities[auth.dutys[key].RoleId] ? roleEntities[auth.dutys[key].RoleId].Label : null,
                DistrictName: districtEntities[auth.dutys[key].DistrictId] ? districtEntities[auth.dutys[key].DistrictId].DistrictName : null,
                CampusName: campusEntities[auth.dutys[key].CampusId] ? campusEntities[auth.dutys[key].CampusId].CampusName : null,
                SpotName: spotEntities[auth.dutys[key].SpotId] ? spotEntities[auth.dutys[key].SpotId].SpotName : null
            }
        }
        return auth;
        //   return {
        //       ...auth,
        //       auth.dutys.
        //   };

    });
export const getRoleList = createSelector(getAuth, (auth) => {
    const roleList: RoleList = {
        districts: [],
        campus: [],
        spots: [],
        posts: []
    };

    for (var key in auth.dutys) {
        roleList.districts.push({
            id: auth.dutys[key].DistrictId,
            name: auth.dutys[key].DistrictName,
            selected: false
        });
        if (auth.dutys[key].CampusId !== null) {
            roleList.campus.push({
                id: auth.dutys[key].CampusId,
                disId: auth.dutys[key].DistrictId,
                name: auth.dutys[key].CampusName,
                selected: false
            });
        }
        if (auth.dutys[key].SpotId !== null) {
            roleList.spots.push({
                id: auth.dutys[key].SpotId,
                camId: auth.dutys[key].CampusId,
                name: auth.dutys[key].SpotName,
                selected: false
            });
        }

        roleList.posts.push({
            ...auth.dutys[key], selected: false
        });

    }
    //console.log(roleList);
    roleList.districts = unique(roleList.districts);
    // console.log(roleList);
    roleList.campus = unique(roleList.campus);
    roleList.spots = unique(roleList.spots);
    return roleList;
    //   return {
    //       ...auth,
    //       auth.dutys.
    //   };

});






//获取选中的学生实体
export const getSelectedStudent = createSelector(getStudentsEntities, getSelectedStudentId, (entities, id) => {
    return entities[id];
});
//获取关联学校，年级，专业的学生  过滤器页面使用
export const getStudentsWithAllInfo = createSelector(getStudents, getSchoolsEntities, getStuFilter, getKey, getAuth, getPage, getPageIds,
    (students, schoolEntities, stufilter, key, auth, page, pageIds) => {
        return students
            .filter(student => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(student.Id) > -1;
                }
            })

            .sort(sortBy(page.order, page.isAsc))
            .map(student => {

                return {
                    ...student,
                    school: schoolEntities[student.SchoolID] ? schoolEntities[student.SchoolID].SchoolName : null,
                    gradeName: grades[student.Grade],
                    majorName: majors[student.Major],
                    nationName: nations[student.Nation],
                    educationName: educations[student.Education]
                };
            });
    });

//获取选中的班级信息
export const getSelectedClass = createSelector(getClassEntities, getSelectedPost, getSelectedClassId, getServicesEntities, (classes, duty, selectedId, serviceentities) => {
    const cla = classes[selectedId];
    return {
        ...cla,
        enableToggle: duty.RoleName === 'ClassCharger',
        Services: cla.Services !== null ? cla.Services.map(s => {
            return {
                ...s,
                ServiceName: serviceentities[s.Id].ServiceName,
                Value: s.CompleteCount / cla.StudentCount * 100

            };
        }) : null
    };
});

//获取的学生信息  过滤器页面使用
export const getStudentsByClass = createSelector(getStudents, getSchoolsEntities, getPage, getPageIds, getSelectedClass,
    (students, schoolEntities, page, pageIds, cla) => {
        return students
            .filter(student => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(student.Id) > -1;
                }
            })

            .sort(sortBy(page.order, page.isAsc))
            .map(student => {

                let stu = {
                    ...student,
                    school: schoolEntities[student.SchoolID] ? schoolEntities[student.SchoolID].SchoolName : null,
                    gradeName: grades[student.Grade]
                };
                if (cla.Services !== null) {

                    cla.Services.forEach(s => {
                        stu[s.Id] = stu.serviceIds === null ? false : stu.serviceIds.indexOf(s.Id) > -1;
                    })
                }
                return stu;

            });
    });

//根据模糊搜索返回学生
export const getStudentsBySearchLike = createSelector(getStudents, getKey, (students, key) => {
    return students
        .filter(student => {
            if (key.length > 0) {
                return student.MobilePhoneNO.indexOf(key) > -1
                    ||student.IdCardNO.indexOf(key) > -1
                    || student.Name.indexOf(key) > -1;
            } else {
                return true;
            }

        });

});

//获取关联学校，年级，专业，证书，记录的学生
export const getStudentWithAll = createSelector(getSelectedStudent, getSchoolsEntities, (student, schoolEntities) => {

    return {
        ...student,
        school: schoolEntities[student.SchoolID] ? schoolEntities[student.SchoolID].SchoolName : null,
        gradeName: grades[student.Grade],
        majorName: majors[student.Major],
        educationName: educations[student.Education],
        nationName: nations[student.Nation],
        image: imgPath + student.IdCardNO,
        card: cardPath + student.IdCardNO,
        scheduleItems: student.Schedule.split("").map(c => parseInt(c)),
        sex: parseInt(student.IdCardNO.charAt(16)) % 2 === 0 ? "female" : "male"
    };

});

//获取选择的学生下的证书
export const getStudentDiplomas = createSelector(getSelectedStudentId, getUserDiplomas, getDiplomasEntities, (studentId, userDiplomas, diplomasEntities) => {
    return userDiplomas.filter(userDiploma => userDiploma.StudentID === studentId)
        .map(userDiploma => {
            return {
                ...userDiploma,
                diplomName: diplomasEntities[userDiploma.DiplomaID] ? diplomasEntities[userDiploma.DiplomaID].DiplomaName : null
            }

        });
});


//获取选择的学生的所有订单产品
export const getStudentProducts = createSelector(getSelectedStudentId, getProductsEntities, getOrders, (studentId, productentities, orders) => {
    return orders.filter(order => order.StudentID === studentId)
        .map(order => {
            return {
                date: order.OrderDate,
                products: order.ProductIds.map(id => productentities[id])
            }

        });
});

//根据选中的类别显示对应的产品
export const getSelectedCategory = createSelector(getCategorysEntities, getSelectedCategoryId, (entities, id) => {
    return entities[id];
});
export const getProductsBySelectedCategory = createSelector(getProducts, getSelectedCategoryId, getCouponsEntities, (products, id, cpns) => {
    return products.filter(p => p.CategoryId === id)
        .map(product => {
            const coupons = product.couponIds.map(id=>cpns[id]);
            const hasCoupon = coupons.length > 0;
            return {
                ...product,
                hasCoupon: hasCoupon,
                src: `${cssPath}assets/img/covers/${Math.floor(Math.random() * 38)}.jpg`,
                defaultCoupon: hasCoupon ?
                    coupons.sort((a, b) => b.Vlaue - a.Vlaue)[0]
                    : null,
                accordIds: product.AccordIdList === null ? [] : product.AccordIdList.split(",")
            };
        });
});




//获取岗位信息
export const getPostInfo = createSelector(getPosts, getPostEntities, getUserEntities,
    (posts, postentities, users) => {
        return posts.map(post => {
            return {
                ...post,
                username: users[post.UserId] ? users[post.UserId].Name : null,
                state: post.State ? '正常' : '禁用',
                users: users[post.UserId] ? [users[post.UserId]] : []
            }
        });
    });
//根据返回分页Post数据
export const getPostsByPage = createSelector(getPostInfo, getPage, getMenuId, getMenuLevel, getPageIds,
    (posts, page, id, level, pageIds) => {
        return posts.filter(p => level === -1 ? true : level === 0 ? p.DistrictId === id : level === 1 ? p.CampusId === id : p.SpotId === id)
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });


//获取产品所有信息
export const getProductsInfo = createSelector(getProducts, getProductsEntities, getCouponsEntities, getServicesEntities, getSubjectsEntities,
    (products, prdentities, coupons, services, subjects) => {
        return products.filter(p => p.couponIds)
            .map(prd => {
                const ids = (prd.AccordIdList === null || prd.AccordIdList === "") ? [] : prd.AccordIdList.split(",");
                const oldproducts = ids.map(id => prdentities[id]);
                const cons = prd.couponIds === null ? [] : prd.couponIds.map(id => coupons[id]);
                const srvices = prd.serviceIds === null ? [] : prd.serviceIds.map(id => services[id]);
                const packageproducts = (prd.PackageIdList === null || prd.PackageIdList === "") ? [] : prd.PackageIdList.split(",").map(id => prdentities[id]);
                return {
                    ...prd,
                    CategoryId: subjects[prd.SubjectId] ? subjects[prd.SubjectId].CategoryId : null,
                    state: prd.State ? '正常' : '下架',
                    discount: prd.IsDiscountForOld ? '是' : '否',
                    package: prd.IsPackage ? '套餐' : '单品',
                    OverDate: prd.OverDate,
                    products: oldproducts,
                    Coupons: cons,
                    Services: srvices,
                    packageproducts: packageproducts,


                }
            });
    });
//根据返回分页Products数据
export const getProductsByPage = createSelector(getProductsInfo, getPage, getMenuId, getMenuLevel, getPageIds,
    (prds, page, id, level, pageIds) => {
        return prds.filter(p => level === -1 ? true : level === 0 ? p.CategoryId === id : p.SubjectId === id)
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });


//获取产品树形菜单
export const getCategoryTree = createSelector(getMenu, getCategorysEntities, getSubjectsEntities,
    (menu, cats, subjects) => {

        return menu.map(cat => {
            const disitems = cat.items.map(sub => {

                return {
                    level: 1,
                    hasChild: false,
                    content: subjects[sub.Id],
                    canAddChild: true,
                    editTitle: "编辑科目",
                    title: subjects[sub.Id] ? subjects[sub.Id].Name : '',
                    state: subjects[sub.Id] ? subjects[sub.Id].State : false,
                    addTitle: "新增产品",
                    open: false,
                };
            });
            return {
                level: 0,
                hasChild: disitems.length > 0,
                content: cats[cat.Id],
                canAddChild: true,
                editTitle: "编辑类别",
                title: cats[cat.Id] ? cats[cat.Id].CategoryName : '',
                state: cats[cat.Id] ? cats[cat.Id].State : false,
                addTitle: "新增科目",
                items: disitems,
                open: false,
                childCount: disitems.length,
            };
        });
    });


//获取优惠券所有信息
export const getCouponsInfo = createSelector(getCoupons, getProductsEntities, getCampusesEntities, getCouponSelectState,
    (coupons, prdentities, campusentities, selectState) => {
        return coupons.filter(p => p.State === selectState)
            .filter(p => p.campusIds)
            .filter(p => p.productIds)
            .filter(p => p.productIds !== null)
            .filter(p => p.campusIds !== null)
            .map(cou => {
                const products = cou.productIds === null ? [] : cou.productIds.map(id => prdentities[id]);
                const campuses = cou.campusIds === null ? [] : cou.campusIds.map(id => campusentities[id]);

                return {
                    ...cou,
                    Products: products,
                    Campuses: campuses
                }
            });
    });

//根据返回分页coupons数据
export const getCouponssByPage = createSelector(getCouponsInfo, getPage, getPageIds,
    (coupons, page, pageIds) => {
        return coupons
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(cou => cou);
    });

//接受传递过来的学生和产品id并生成购物车订单数据
const changeCarts = (state, action) => {
    const spids = action.payload;//接收payload{StudentID，ProductIds}
    if (spids.length <= 0) {
        return { ...state, cart: initialState.cart };
    }
    const ids = spids.map(sp => sp.StudentID);
    const newids = state.cart.ids.filter(id => ids.indexOf(id) > -1);//选择应该保留的id
    const addids = _.difference(ids, newids);//查出需要增加的id
    if (newids.length === 0 && addids.length === 0) {//如果
        return state;
    }
    var newEntities;
    if (newids.length !== 0) {
        newEntities = buildObjFromArr(newids, state.cart.entities);
    }
    if (addids.length !== 0) {
        const productentities = getProductsEntities(state);//获取所有产品实体
        const coupons = getCoupons(state);//获取所有优惠券
        const orders = getOrders(state);//获取所有订单
        const cart = getCarts(state);//获取所有购物车订单
        var addentities = action.payload.filter(sp => addids.indexOf(sp.StudentID) > -1)//支队增加的id进行处理
            .map(sp => {
                const orderdetails = sp.ProductIds.map(productId => {
                    const cous = coupons
                        .filter(c => productentities[productId].couponIds.indexOf(c.Id) > -1)
                        .sort((a, b) => b.Vlaue - a.Vlaue);//获取该产品的所有优惠券
                    const couponid = cous.length > 0 ? cous[0].Id : null;//判断优惠券有无病返回面值最大的
                    const couponName = cous.length > 0 ? cous[0].CouponName : null;//获取优惠券名称
                    const couponvalue = cous.length > 0 ? cous[0].Vlaue : 0;//获取优惠券面值
                    const product = productentities[productId];//获取产品
                    const accordIds = product.AccordIdList === null ? [] : product.AccordIdList.split(",");//获取产品的老学员判断依据id列表
                    const order = orders.filter(o => o.StudentID == sp.StudentID);//获取所有本学生的订单
                    const hasOrder = order.length > 0;//判断是否有订单
                    const curOrder = spids.filter(c => c.StudentID == sp.StudentID);//获取购物车订单
                    const hasCurOrder = curOrder.length > 0;//判断是否有购物车订单
                    const isold = product.IsDiscountForOld && ((hasOrder && accordIds
                        .filter(id => order.map(o => o.ProductIds).reduce(function (prev, cur, index, arr) {
                            return prev.concat(cur);
                        }).map(id => id.toString()).indexOf(id) > -1)
                        .length > 0) || (hasCurOrder &&
                            accordIds
                                .filter(id => curOrder.map(c => c.ProductIds).reduce(function (prev, cur, index, arr) {
                                    return prev.concat(cur);
                                }).indexOf(id) > -1)
                                .length > 0));//判断是否老学员优惠
                    const discountvalue = isold ? product.DiscountValue : 0;//获取老学员优惠金额
                    const campusid = state.auth.dutys[state.auth.currentDutyId].CampusId !== null ? state.auth.dutys[state.auth.currentDutyId].CampusId : "";
                    return {
                        ProductId: productId,
                        CouponID: couponid,
                        IsDiscountForOld: isold,
                        CampusId: campusid,
                        productName: product.ProductName,
                        price: product.Price,
                        isCanOld: product.IsDiscountForOld,
                        couponName: couponName,
                        discount: couponvalue + discountvalue,
                        canOldValue: product.DiscountValue,
                        discountPrice: product.Price - couponvalue - discountvalue,
                        ActualPay:product.Price - couponvalue - discountvalue,
                        IsDebt:false,
                        Debt:0,
                        Count:1
                    };
                }
                );
                const details=orderdetails.reduce((entities, o) =>
                ({
                    ...entities, [o.ProductId]: o
                }), {});
                return {
                    OrderNO: new Date().toTimeString() + (1000 + Math.round(Math.random() * 1000)),
                    StudentID: sp.StudentID,
                    PostUserId: state.auth.currentDutyId,
                    OrderDate: new Date(),
                    State: "0",
                    PayDate: new Date(),
                    TradeNO: "",
                    pay:0,
                    Remark: "",
                    ProductIds: sp.ProductIds,
                    details: details,
                    ChannelIds:[],
                    Cashiers:[]
                };

            })
            .reduce((entities, o) =>
                ({
                    ...entities, [o.StudentID]: o
                }), {});

    }
    const list = spids.length > 0 ? { PackageId: spids[0].PackageId, ProductId: spids[0].ProductId } : null;
    return {
        ...state, cart: {
            ids: [...newids, ...addids],
            entities: { ...newEntities, ...addentities },
            selectedId: null
        }
    };
}



//学生订单获取后再次检查购物车
const checkCarts = (state, action) => {
    if (action.payload.length === 0) {
        return state;
    }
    const carts = getCarts(state);
    if (carts.length <= 0) {
        return state;
    }
    const productentities = getProductsEntities(state);
    const stdIds = action.payload.map(o => o.StudentID);
    const pids = action.payload.map(o => o.ProductIds).reduce(function (prev, cur, index, arr) {
        return prev.concat(cur);
    }).map(id => id.toString());

    const newentities = carts.filter(c => stdIds.indexOf(c.StudentID) > -1)
        .map(c => {
            const orderdetails = c.ProductIds.map(id => c.details[id]).map(d => {
                const product = productentities[d.ProductId];
                const accordIds = product.AccordIdList === null ? [] : product.AccordIdList.split(",");
                console.log(accordIds);
                const isold = product.IsDiscountForOld && accordIds
                    .filter(id => pids.indexOf(id) > -1)
                    .length > 0;

                const discountvalue = isold ? product.DiscountValue : 0;
                return {
                    ...d,
                    discount: d.discount + (d.IsDiscountForOld ? 0 : discountvalue),
                    IsDiscountForOld: isold,
                    discountPrice: product.Price - d.discount - (d.IsDiscountForOld ? 0 : discountvalue)
                };
            });
            const details=orderdetails.reduce((entities, o) =>
            ({
                ...entities, [o.ProductId]: o
            }), {});
            // console.log(details);
            return {
                ...c,
                details: details
            };

        }).reduce((entities, o) =>
            ({ ...entities, [o.StudentID]: o }), {});
    return {
        ...state, cart: {
            ids: [...state.cart.ids],
            entities: { ...state.cart.entities, ...newentities },
            selectedId: null
        }
    };
}

//获取购物车订单信息
export const getCartsWithAll = createSelector(getCarts, getProductsEntities, getCouponsEntities,
    getStudentsEntities, (carts, products, cpns, students) => {
        return carts
            .map(cart => {
                const details = cart.ProductIds.map(id => cart.details[id]);
                const actualPay=details.map(d=>d.ActualPay).reduce(function (prev, cur, index, arr) {
                    return prev+cur;
                });//计算出实付金额
                const price=details.map(d=>d.price).reduce(function (prev, cur, index, arr) {
                    return prev+cur;
                });//计算出原始价格
                const discountPrice=details.map(d=>d.discountPrice*d.Count).reduce(function (prev, cur, index, arr) {
                    return prev+cur;
                });//计算出优惠价格
                const debt=details.map(d=>d.Debt).reduce(function (prev, cur, index, arr) {
                    return prev+cur;
                });
                const chaels=cart.ChannelIds.map(id=>cart.channels[id]).map(c=>{
                    return {
                        ...c,
                        name:channels[c.Channel]
                    }
                })
                return {
                    ...cart,
                    student: students[cart.StudentID] ? students[cart.StudentID] : null,
                    IsDebt:details.filter(d=>d.IsDebt).length>0,
                    Debt:debt,
                    ActualPay:actualPay,
                    price:price,
                    discountPrice:discountPrice,
                    IsOtherDiscount:discountPrice-actualPay-debt>0,
                    OtherDiscountValue: discountPrice-actualPay-debt,
                    campus: details.map(d => d.CampusId),
                    actualpay:details.map(d=>d.ActualPay),
                    count:details.map(d=>d.Count),
                    debt:details.map(d=>d.Debt),
                    Cashiers:chaels
                };
            });
    });
//获取修改订单信息
export const getEditCartWithAll = createSelector(getCarts, getProductsEntities, getCouponsEntities,
    getStudentsEntities, getSelectedCartId, (carts, products, cpns, students, selectId) => {
        return carts.filter(c => c.StudentID == selectId)
            .map(cart => {

                return {
                    ...cart,
                    student: students[cart.StudentID] ? students[cart.StudentID] : null,
                    AllDiscount: cart.price - cart.Debt - cart.ActualPay,
                    campus: cart.OrderDetails.map(d => d.CampusId)
                };
            });
    });

//获取要保存的订单信息
export const getSaveOrders = createSelector(getCarts, getProductsEntities, getCouponsEntities
    , (carts, products, cpns) => {
        return carts
            .map(order => {
                const orderdetails = order.ProductIds.map(id => order.details[id]).map(d => {
                    const price = d.discountPrice;//获取该产品的价格
                    return {
                        ...d,
                        Discount: d.discountPrice*d.Count-d.ActualPay-d.Debt
                    }
                });
                const chs=order.ChannelIds.map(id=>order.channels[id]);
                return {
                    ...order,
                    OrderDetails: orderdetails,
                    Cashiers: chs,
                    ActualPay:orderdetails.map(d=>d.ActualPay).reduce(function (prev, cur, index, arr) {
                        return prev+cur;
                    },0),
                    total:chs.map(c=>c.Value).reduce(function (prev, cur, index, arr) {
                        return prev+cur;
                    },0)
                };
            });
    });

//根据当前岗位获取订单
export const getOrdersByDuty = createSelector(getOrders, getAuth, getProductsEntities, getStudentsEntities, getPage, getPageIds,
    (orders, auth, productentities, studententities, page, pageIds) => {

        return orders.filter(order => order.PostUserId === auth.currentDutyId)
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(order => {
                
                return {
                    ...order,
                    student: studententities[order.StudentID] ? studententities[order.StudentID] : null,
                    products: order.ProductIds.map(p => productentities[p]),
                    Cashiers:order.Cashiers.map(c=>{
                        return {
                            ...c,
                            name:channels[c.Channel]
                        }
                    })
                };
            });
    });
//根据当前岗位获取单据
export const getReceiptsByDuty = createSelector(getReceipts, getAuth, getPage, getPageIds,
    (receipts, auth, page, pageIds) => {

        return receipts.filter(order => order.CheckUserId == auth.currentDutyId)
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(order => {
                console.log(order.ConfirmTime);
                return {
                    ...order,
                    cansms: order.State === 0 && (order.ConfirmTime === null ? true : (new Date(order.ConfirmTime).getDate() < new Date().getDate()))
                }
            });
    });

//获取机构树形菜单
export const getOrganization = createSelector(getMenu, getDistrictsEntities, getCampusesEntities, getSpotsEntities,
    (menu, districts, campuses, spots) => {
        return menu.map(dis => {
            const disitems = dis.items.map(cam => {
                const camitems = cam.items !== null ? cam.items.map(spot => {
                    return {
                        level: 2,
                        hasChild: false,
                        content: spots[spot.Id],
                        canAddChild: false,
                        editTitle: "编辑服务点",
                        title: spots[spot.Id] ? spots[spot.Id].SpotName : "",
                        state: spots[spot.Id] ? spots[spot.Id].SpotState : false,
                        //root:false
                    };
                }) : [];
                return {
                    level: 1,
                    hasChild: camitems.length > 0,
                    content: campuses[cam.Id],
                    canAddChild: true,
                    editTitle: "编辑校区",
                    title: campuses[cam.Id] ? campuses[cam.Id].CampusName : "",
                    state: campuses[cam.Id] ? campuses[cam.Id].CampusState : false,
                    addTitle: "新增服务点",
                    items: camitems,
                    open: false,
                    childCount: camitems.length,
                    //root:false
                };
            });
            return {
                level: 0,
                hasChild: disitems.length > 0,
                content: districts[dis.Id],
                canAddChild: true,
                editTitle: "编辑大区",
                title: districts[dis.Id] ? districts[dis.Id].DistrictName : "",
                state: districts[dis.Id] ? districts[dis.Id].DistrictState : false,
                addTitle: "新增校区",
                items: disitems,
                open: false,
                childCount: disitems.length,
                //root:true
            };
        });
    });

//根据返回分页service数据
export const getServicesByPage = createSelector(getServices, getPage, getPageIds,
    (services, page, pageIds) => {
        return services
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });

//根据返回分页diploma数据
export const getDiplomasByPage = createSelector(getDiplomas, getPage, getPageIds,
    (diplomas, page, pageIds) => {
        return diplomas
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });
//根据返回分页school数据
export const getSchoolsByPage = createSelector(getSchools, getPage, getPageIds,
    (schools, page, pageIds) => {
        return schools
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });

//根据返回分页user数据
export const getUsersByPage = createSelector(getUsers, getPage, getPageIds,
    (users, page, pageIds) => {
        return users
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });
//根据返回分页district数据
export const getDistrictsByPage = createSelector(getDistricts, getPage, getPageIds,
    (dis, page, pageIds) => {
        return dis
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });
//根据返回分页campus数据
export const getCampussByPage = createSelector(getCampuses, getPage, getPageIds,
    (campuses, page, pageIds) => {
        return campuses
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });
//根据返回分页campus数据
export const getSpotsByPage = createSelector(getSpots, getPage, getPageIds,
    (spots, page, pageIds) => {
        return spots
            .filter(p => {
                if (pageIds === null) {
                    return true;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });
//根据返回分页detail数据
export const getDetailsByPage = createSelector(getOrderDetails, getPage, getPageIds,
    (details, page, pageIds) => {
        return details
            .filter(p => {
                if (pageIds === null) {
                    return false;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(school => school);
    });

//根据返回分页class数据
export const getClassesByPage = createSelector(getClasses, getPage, getPageIds, getSelectedPost,
    (classes, page, pageIds, duty) => {
        return classes
            .filter(p => {
                if (pageIds === null) {
                    return false;
                } else {
                    return pageIds.indexOf(p.Id) > -1;
                }
            })
            .sort(sortBy(page.order, page.isAsc)) //false为降序
            //.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize>page.count?page.count:page.currentPage*page.pageSize)
            .map(cla => {
                return {
                    ...cla,
                    products: [{
                        Id: cla.ProductID,
                        ProductName: cla.ProductName
                    }],
                    OverDate: chinaDate(cla.OverDate),
                    showMenu: duty.RoleName === 'Dean'
                }
            });
    });


//获取页码数据
export const getPages = createSelector(getPage, (page) => {
    const totalPage = Math.ceil(page.count / page.pageSize);
    const currentPage = page.currentPage;
    var pages = [];
    for (var i = 1; i <= totalPage; i++) {
        if (i <= 3 || i >= totalPage - 2 || (i <= currentPage + 2 && i >= currentPage - 2)) {
            pages.push(i);
        }
    }
    for (var i = 0; i < pages.length; i++) {
        if (pages[i + 1] - pages[i] >= 2) {
            pages.splice(i + 1, 0, 0);
            i = i + 1;
        }
    }
    return {
        ...page,
        totalPage: totalPage,
        pages: pages
    }
});

// export const getMaxListOrder = createSelector(getTaskListEntities, getTaskListSelectedIds, (entities, ids) => {
//     const orders: number[] = ids.map(id => entities[id].order);
//     return orders.sort()[orders.length - 1];
// });




@NgModule({
    imports: [
        /**
     * StoreModule.provideStore  仅需引入一次，请把它包含在根模块或者 CoreModule 中
     * 我们这里为了方便组织，新建了一个 AppStoreModule，但也是只在 CoreModule 中引入的
     */
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        // DevTool 需要在 StoreModule 之后导入
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        }),
    ]
})
export class AppStoreModule { }