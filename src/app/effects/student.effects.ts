import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/student.action';
import * as userActions from '../actions/user.action';
import * as udactions from '../actions/userDiploma.action';
import * as filterActions from '../actions/stuFilter.action';
import * as searchActions from '../actions/search.action';
import * as ordActions from '../actions/order.action';
import { StudentService } from '../services/student.service';
import { Student } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class StudentEffects {
    @Effect() 
    loadStudent$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(_=>this.service$.get()
            .map(students=>new actions.LoadSuccessAction(students))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );
    // @Effect() 
    // loadStudentByInstructor$: Observable<Action> = this.actions$.//进入页面时根据员工编号装载数据
    //     ofType(actions.ActionTypes.LOAD_BY_INTOR)
    //     .map(toPayload)
    //     .switchMap((idList:string[])=>this.service$.getByInstructor(idList)
    //         .map(students=>new actions.LoadByIntorSuccessAction(students))
    //         .catch(err=>Observable.of(new actions.LoadByIntorFailAction(JSON.stringify(err))))
    //     );
    // @Effect() 
    // tosearch$: Observable<Action> = this.actions$.  //接受搜索信号并开始搜索
    //     ofType(actions.ActionTypes.SEARCH)
    //     .map(toPayload)
    //     .switchMap(str=>this.service$.search(str)
    //         .map(students=>new actions.SearchSuccessAction(students))
    //         .catch(err=>Observable.of(new actions.SearchFailAction(JSON.stringify(err))))
    //     );
    @Effect() 
    tosearchLike$: Observable<Action> = this.actions$.  //接受搜索信号并开始搜索
        ofType(actions.ActionTypes.SEARCH_LIKE)
        .map(toPayload)
        .switchMap(str=>this.service$.searchLike(str)
            .map(students=>new actions.SearchLikeSuccessAction(students))
            .catch(err=>Observable.of(new actions.SearchLikeFailAction(JSON.stringify(err))))
        );
    // @Effect()
    // changeSearch$: Observable<Action> = this.actions$.//接受到搜索关键词变化信号引发搜索
    //     ofType(searchActions.ActionTypes.CHANGE)
    //     .map(toPayload)
    //     .map(key=>new actions.SearchAction(key));
     @Effect()
    changeSearchLike$: Observable<Action> = this.actions$.//接受到模糊搜索关键词变化信号引发搜索
        ofType(searchActions.ActionTypes.CHANGE_LIKE)
        .map(toPayload)
        .map(key=>new actions.SearchLikeAction(key));
    //  @Effect() //接受筛选组件变化信号并引发根据筛选加载数据信号
    // changeFilter$: Observable<Action> = this.actions$.
    //     ofType(filterActions.ActionTypes.CHANGE)
    //     .map(toPayload)
    //     .map(filter=>new actions.LoadByFilterAction(filter));  
     
    @Effect() 
    loadByFilter$: Observable<Action> = this.actions$.//接受根据筛选装载信号并开始装载
        ofType(actions.ActionTypes.LOAD_BY_FILTER)
        .map(toPayload)
        .switchMap(data=>this.service$.getByFilter(data.filter,data.key,data.page)
            .map(result=>new actions.LoadByFilterSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByFilterFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadByClass$: Observable<Action> = this.actions$.//接受根据筛选装载信号并开始装载
        ofType(actions.ActionTypes.LOAD_BY_CLASS)
        .map(toPayload)
        .switchMap(data=>this.service$.getByClass(data.classid,data.key,data.page)
            .map(result=>new actions.LoadByClassSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByClassFailAction(JSON.stringify(err))))
        );
    @Effect() 
    addStudent$: Observable<Action> = this.actions$.//接受添加学生信号并开始添加
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(student=>{
            const added={...student,InstructorID:2};
           return  this.service$.add(added)
            .map(student=>new actions.AddSuccessAction(student))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updateStudent$: Observable<Action> = this.actions$.//接受更新学生信号并开始更新
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap((student)=>this.service$.updateInfo(student)
            .map(student=>new actions.UpdateSuccessAction(student))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    updateStudentService$: Observable<Action> = this.actions$.//接受更新学生信号并开始更新
        ofType(actions.ActionTypes.UPDATE_SERVICE)
        .map(toPayload)
        .switchMap((data)=>this.service$.updateService(data.postuserid,data.serviceid,data.enrollmentid,data.state)
            .map(student=>new actions.UpdateServiceSuccessAction(student))
            .catch(err=>Observable.of(new actions.UpdateServiceFailAction(JSON.stringify(err))))            
        );   
    
       
    // @Effect() 
    // deleteStudent$: Observable<Action> = this.actions$.
    //     ofType(actions.ActionTypes.DELETE)
    //     .map(toPayload)
    //     .switchMap((student)=>this.service$.del(student)
    //         .map(student=>new actions.DeleteSuccessAction(student))
    //         .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
    //     );   
    @Effect() 
    selectStudent$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.SELECT)
        .map(toPayload)
        .map(student=>go([`/student/${student.Id}`])); 
   @Effect() 
    loadUserDiploma$: Observable<Action> = this.actions$.//选择一个学生时装载该学生的所有证书
        ofType(actions.ActionTypes.SELECT)
        .map(toPayload)
        .map(student=>new udactions.LoadByStudentAction(student.Id)); 
    @Effect() 
    loadOrders$: Observable<Action> = this.actions$.//选择一个学生时装载该学生的所有订单
        ofType(actions.ActionTypes.SELECT)
        .map(toPayload)
        .map(student=>new ordActions.LoadByStudentAction(student.Id)); 

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:StudentService
    ) {}
}