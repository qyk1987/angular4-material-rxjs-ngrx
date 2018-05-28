import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Diploma, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class DiplomaService  {
    
    private readonly domain="diplomas";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(diploma:Diploma):Observable<Diploma>{
        const uri=`${this.domain}`;
        const add={...diploma,CreateDate:new Date(),DiplomaState:true};
        return this.http
            .post(uri,diploma)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(diploma:Diploma):Observable<Diploma>{
        const uri=`${this.domain}/${diploma.Id}`;
        return this.http
            .put(uri,diploma)
            .map(res=>res);
    }

     //delete删除
     del(diploma:Diploma):Observable<Diploma>{
        const uri=`${this.domain}/${diploma.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Diploma);
    }

    get(): Observable<Diploma[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Diploma[]);
    }
    getDiploma(id):Observable<Diploma>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Diploma);
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