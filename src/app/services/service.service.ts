import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Service,Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class ServiceService  {
    
    private readonly domain="services";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,@Inject('BASE_ASPNET_API_CONFIG') private config){
        
      
    }

    //POST增加
    add(service:Service):Observable<Service>{
        const uri=`${this.domain}`;
        const add={...service,State:true};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(service:Service):Observable<Service>{
        const uri=`${this.domain}/${service.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/ServiceName", "value": service.ServiceName },
            { "op": "replace", "path": "/State", "value": service.State},
           
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(service:Service):Observable<Service>{
        const uri=`${this.domain}/${service.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Service);
    }

    get(): Observable<Service[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Service[]);
    }
    getService(id):Observable<Service>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Service);
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