
import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Spot, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class SpotService  {
    
    private readonly domain="spots";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(spot:Spot):Observable<Spot>{
        const uri=`${this.domain}`;
        const add={...spot,CreateDate:new Date(),SpotState:true};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(spot:Spot):Observable<Spot>{
        const uri=`${this.domain}/${spot.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/SpotName", "value": spot.SpotName },
            { "op": "replace", "path": "/SpotAddress", "value": spot.SpotAddress},
            { "op": "replace", "path": "/SpotState", "value": spot.SpotState},
           
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(spot:Spot):Observable<Spot>{
        const uri=`${this.domain}/${spot.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Spot);
    }

    get(): Observable<Spot[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Spot[]);
    }
    getSpot(id):Observable<Spot>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Spot);
    }

    getByCampus(id):Observable<Spot[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'campusId':id})
        .map(res=>res as Spot[]);
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