import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {User, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class UserService  {
    
    private readonly domain="users";
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(user:User):Observable<User>{
        const uri=`${this.domain}`;
        const add={...user,CreateDate:new Date()};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(user:User):Observable<User>{
        const uri=`${this.domain}/${user.Id}`;
        return this.http
            .put(uri,user)
            .map(res=>res);
    }

     //delete删除
     del(user:User):Observable<User>{
        const uri=`${this.domain}/${user.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as User);
    }

    get(): Observable<User[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as User[]);
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
    getUser(id):Observable<User>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as User);
    }
    searchUsers(key:string): Observable<User[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{key:key})
            .map(res=>res as User[]);
    }
   
}