import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Campus, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class CampusService  {
    
    private readonly domain="campus";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(campus:Campus):Observable<Campus>{
        const uri=`${this.domain}`;
        const add={...campus,CreateDate:new Date(),CampusState:true};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(campus:Campus):Observable<Campus>{
        const uri=`${this.domain}/${campus.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/CampusName", "value": campus.CampusName },
            { "op": "replace", "path": "/CampusAddress", "value": campus.CampusAddress},
            { "op": "replace", "path": "/CampusState", "value": campus.CampusState},
           
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(campus:Campus):Observable<Campus>{
        const uri=`${this.domain}/${campus.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Campus);
    }

    get(): Observable<Campus[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Campus[]);
    }
    getCampus(id):Observable<Campus>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Campus);
    }

    getByDistrict(id):Observable<Campus[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'districtId':id})
        .map(res=>res as Campus[]);
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
   
}