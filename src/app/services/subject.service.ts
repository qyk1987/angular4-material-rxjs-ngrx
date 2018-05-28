import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Subject} from '../domain';

@Injectable()
export class SubjectService  {
    
    private readonly domain="subjects";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(subject:Subject):Observable<Subject>{
        const uri=`${this.domain}`;
        const add={...subject,CreateTime:new Date(),State:true,Sort:1};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(subject:Subject):Observable<Subject>{
        const uri=`${this.domain}/${subject.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/Name", "value": subject.Name },
            { "op": "replace", "path": "/State", "value": subject.State},
           
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(subject:Subject):Observable<Subject>{
        const uri=`${this.domain}/${subject.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Subject);
    }

    get(): Observable<Subject[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Subject[]);
    }
    getSubject(id):Observable<Subject>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Subject);
    }

    getByCategory(id):Observable<Subject[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'categoryId':id})
        .map(res=>res as Subject[]);
    }
   
}