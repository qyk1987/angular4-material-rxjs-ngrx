import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Student, StuFilter, Page} from '../domain';
import { PageResult } from '../vm';
import {trim} from '../utils/string.util'
@Injectable()
export class StudentService  {
    
    private readonly domain="students";
  
    constructor(private http:HttpService,
        
        ){
        
      
    }

    //POST增加
    add(student:Student):Observable<Student>{
        const uri=`${this.domain}`;
        return this.http
            .post(uri,student)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    updateInfo(student:Student):Observable<Student>{
        const uri=`${this.domain}/${student.Id}`;
        
        const toupdate=[
            { "op": "replace", "path": "/Name", "value": trim(student.Name) },
            { "op": "replace", "path": "/IdCardNO", "value": trim(student.IdCardNO)},
            { "op": "replace", "path": "/Major", "value": student.Major},
            { "op": "replace", "path": "/Grade", "value": student.Grade},
            { "op": "replace", "path": "/MobilePhoneNO", "value": trim(student.MobilePhoneNO)},
            { "op": "replace", "path": "/WorkPlace", "value": trim(student.WorkPlace)},
            { "op": "replace", "path": "/SchoolID", "value": student.SchoolID},
            { "op": "replace", "path": "/QQ", "value": trim(student.QQ)},
            { "op": "replace", "path": "/Province", "value": student.Province},
            { "op": "replace", "path": "/City", "value": student.City},
            { "op": "replace", "path": "/District", "value": student.District},
            { "op": "replace", "path": "/ClassName", "value": student.ClassName},
            { "op": "replace", "path": "/Schedule", "value": student.Schedule},
            { "op": "replace", "path": "/Nation", "value": student.Nation},
           
        ]
        
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }


    uploadImg(id:string):Observable<Student>{
        const uri=`${this.domain}/${id}`;
        const toUpdate={
            IsUploaImg:true
        };
        return this.http
            .patch(uri,toUpdate)
            .map(res=>res);
    }

    uploadCard(id:string):Observable<Student>{
        const uri=`${this.domain}/${id}`;
        const toUpdate={
            IsUploaCard:true
        };
        return this.http
            .patch(uri,toUpdate)
            .map(res=>res);
    }

     //delete删除
    //  del(student:Student):Observable<Student>{
    //     const delTask$=Observable
    //         .from(student.taskLists?student.taskLists:[])
    //         .mergeMap(listId=>this.http.delete(`taskLists/${listId}`))
    //         .count();
    //     return delTask$
    //         .switchMap(_=>this.http.delete(`${this.domain}/${student.id}`))
    //         .mapTo(student);
    // }

    get(): Observable<Student[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>
            res as Student[]                       
                );
    }
    // getByInstructor(ids:string[]): Observable<Student[]>{
    //     const uri=`${this.domain}`;
    //     return this.http
    //         .get(uri,{params:{'postIds':JSON.stringify(ids)}})
    //         .map(res=>res as Student[]);
    // }

    //获取筛选组件内容
    getFilter(ids:string[]): Observable<StuFilter>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'postIds':JSON.stringify(ids),"foo":false})
            .map(res=>res as StuFilter);
    }

    getByFilter(filter:StuFilter,key:string,page:Page): Observable<PageResult>{
        const uri=`${this.domain}`;
        const params={
            strQuery:JSON.stringify(filter),
            key:key,
            pageSize:page.pageSize,
            page:page.currentPage,
            order:page.order,
            isAsc:page.isAsc
        }
        return this.http
            .get(uri,params)
            .map(res=>res as  PageResult);
    }
    getByClass(classid:string,key:string,page:Page): Observable<PageResult>{
        const uri=`${this.domain}/getByClass`;
        const params={
            classid:classid,
            key:key,
            pageSize:page.pageSize,
            page:page.currentPage,
            order:page.order,
            isAsc:page.isAsc
        }
        return this.http
            .get(uri,params)
            .map(res=>res as  PageResult);
    }
    search(key:string): Observable<Student[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'key':key})
            .map(res=>res as  Student[]);
    }

    searchLike(key:string): Observable<Student[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'strLike':key})
            .map(res=>res as  Student[]);
    }

    updateService(postuserid:string,serviceid:string,enrollmentid:string,state:boolean):Observable<Student>{
        const uri=`${this.domain}/UpdateService`;
        const data={
            EnrollmentId:enrollmentid,
            ServiceId:serviceid,
            PostUserId:postuserid,
            State:state,
            DueDate:new Date()
        }
        return this.http
            .post(uri,data)
            .map(res=>res as  Student);
    }
}