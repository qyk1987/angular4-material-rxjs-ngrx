import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {District, Page} from '../domain';
import { PageResult } from '../vm';
@Injectable()
export class DistrictService  {
    
    private readonly domain="districts";
 
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(district:District):Observable<District>{
        const uri=`${this.domain}`;
        const add={...district,CreateDate:new Date(),DistrictState:true};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(district:District):Observable<District>{
        const uri=`${this.domain}/${district.Id}`;

        return this.http
            .put(uri,district)
            .map(res=>res);
    }

     //delete删除
     del(district:District):Observable<District>{
        const uri=`${this.domain}/${district.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as District);
    }

    get(): Observable<District[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as District[]);
    }
    getDistrict(id):Observable<District>{
        const uri=`${this.domain}/${id}`;
        return this.http
            .get(uri)
            .map(res=>res as District);
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

    getTree():Observable<any>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'chart':1})
            .map(res=>res );
    }
    getMenu():Observable<any>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'menu':1})
            .map(res=>res );
    }
}