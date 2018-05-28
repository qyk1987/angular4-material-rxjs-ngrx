import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Coupon, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class CouponService  {
    
    private readonly domain="coupons";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(coupon:Coupon):Observable<Coupon>{
        const uri=`${this.domain}`;
        const add={
            ...coupon,
            State:true,
            StartDate:new Date()
        
        };
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(coupon:Coupon):Observable<Coupon>{
        const uri=`${this.domain}/${coupon.Id}`;

        
        const toupdate=[
            { "op": "replace", "path": "/CouponName", "value": coupon.CouponName },
            { "op": "replace", "path": "/Vlaue", "value": coupon.Vlaue },
            { "op": "replace", "path": "/Rule", "value": coupon.Rule },
            { "op": "replace", "path": "/OverDate", "value": coupon.OverDate },
            { "op": "replace", "path": "/State", "value": coupon.State },
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(coupon:Coupon):Observable<Coupon>{
        const uri=`${this.domain}/${coupon.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Coupon);
    }

    get(): Observable<Coupon[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Coupon[]);
    }
    getCoupon(id):Observable<Coupon>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Coupon);
    }
    getByCampus(id):Observable<Coupon[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'campusid':id})
            .map(res=>res as Coupon[]);
    }
    getByPage(state,key,page:Page):Observable<PageResult>{
        const uri=`${this.domain}`;
        const params={
            state:state,
            key:key,
            pageSize:page.pageSize,
            page:page.currentPage,
            order:page.order,
            isAsc:page.isAsc
        }
        return this.http
        .get(uri,params)
        .map(res=>res as PageResult);
    }
    inviteProducts(coupon):Observable<Coupon>{
        const uri=`${this.domain}/${coupon.Id}?prd=false`;
        return this.http
            .put(uri,coupon.Products.map(p=>p.Id))
            .map(res=>res);
    }
    inviteCampuses(coupon):Observable<Coupon>{
        const uri=`${this.domain}/${coupon.Id}?cam=false`;
        return this.http
            .put(uri,coupon.Campuses.map(p=>p.Id))
            .map(res=>res);
    }
}