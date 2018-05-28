import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Role, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class RoleService  {
    
    private readonly domain="roles";
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(role:Role):Observable<Role>{
        const uri=`${this.domain}`;
        const add={...role,CreateDate:new Date()};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(role:Role):Observable<Role>{
        const uri=`${this.domain}/${role.Id}`;
        return this.http
            .put(uri,role)
            .map(res=>res);
    }

     //delete删除
     del(role:Role):Observable<Role>{
        const uri=`${this.domain}/${role.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Role);
    }

    get(): Observable<Role[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Role[]);
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
    getRole(id):Observable<Role>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Role);
    }
    searchRoles(key:string): Observable<Role[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{key:key})
            .map(res=>res as Role[]);
    }
   
}