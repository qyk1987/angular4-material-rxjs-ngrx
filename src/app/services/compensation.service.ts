import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Compensation, Order} from '../domain';

@Injectable()
export class CompensationService  {
    
    private readonly domain="compensations";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(compensation:Compensation):Observable<Compensation>{
        const uri=`${this.domain}`;
        return this.http
            .post(uri,compensation)
            .map(res=>res as Compensation);
    }

    //put会修改所有值   patch可以只修改某些值
    update(compensation:Compensation):Observable<Compensation>{
        const uri=`${this.domain}/${compensation.Id}`;

        const toupdate=[
            { "op": "replace", "path": "/Value", "value": compensation.Value },
            { "op": "replace", "path": "/Channel", "value": compensation.Channel },
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(compensation:Compensation):Observable<Compensation>{
        const uri=`${this.domain}/${compensation.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Compensation);
    }

    get(): Observable<Compensation[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Compensation[]);
    }
    getCompensation(id):Observable<Compensation>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Compensation);
    }
   
}