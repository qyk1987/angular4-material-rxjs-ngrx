import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {School, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class SchoolService  {
    
    private readonly domain="schools";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(school:School):Observable<School>{
        const uri=`${this.domain}`;
        const add={...school,CreateDate:new Date()};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(school:School):Observable<School>{
        const uri=`${this.domain}/${school.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/SchoolName", "value": school.SchoolName },
           
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(school:School):Observable<School>{
        const uri=`${this.domain}/${school.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as School);
    }

    get(): Observable<School[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as School[]);
    }

    getByPage(page:Page): Observable<PageResult>{
        const uri=`${this.domain}`;
        const params={
            'pageSize':page.pageSize,
            'page':page.currentPage,
            'order':page.order,
            'isAsc':page.isAsc
        }
        return this.http
            .get(uri,params)
            .map(res=>res as PageResult);
    }
    getSchool(id):Observable<School>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as School);
    }
   
}