import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Category} from '../domain';

@Injectable()
export class CategoryService  {
    
    private readonly domain="categories";
   
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(category:Category):Observable<Category>{
        const uri=`${this.domain}`;
        const add={...category,State:true,Sort:1};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(category:Category):Observable<Category>{
        const uri=`${this.domain}/${category.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/CategoryName", "value": category.CategoryName },
            { "op": "replace", "path": "/State", "value": category.State },
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(category:Category):Observable<Category>{
        const uri=`${this.domain}/${category.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Category);
    }

    get(): Observable<Category[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Category[]);
    }
    getCategory(id):Observable<Category>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Category);
    }
   
}