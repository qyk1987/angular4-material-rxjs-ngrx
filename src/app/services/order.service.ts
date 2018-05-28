import { Injectable,Inject} from '@angular/core';
import{Observable} from 'rxjs/Observable';
import {Order, Page,OrderFilterData} from '../domain';
import { OrderVM, OrderResult, PageResult } from '../vm';
import {HttpService} from './http.service';
@Injectable()
export class OrderService  {
    
    private readonly domain="orders";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(order:Order):Observable<Order>{
        const uri=`${this.domain}`;
        return this.http
            .post(uri,order)
            .map(res=>res);
    }
    addBatch(orders:Order[]):Observable<string>{
        const uri=`${this.domain}`;
        return this.http
            .post(uri,orders)
            .map(res=>res as string);
    }

    //put会修改所有值   patch可以只修改某些值
    update(order:Order):Observable<Order>{
        const uri=`${this.domain}/${order.Id}`;
        const toupdate={
            Id:order.Id,
            Cashiers:order.Cashiers,
            OrderNO:order.OrderNO,
            OrderDate:order.OrderDate,
            IsDebt:order.IsDebt,
            IsOtherDiscount:order.IsOtherDiscount,
            PostUserId:order.PostUserId,
            PayDate:order.PayDate,
            TradeNO:order.TradeNO,
            State:order.State,
            StudentID:order.StudentID,
            Remark:order.Remark,
            ReceiptID:order.ReceiptID
        }
        return this.http
            .put(uri,toupdate)
            .map(res=>res as Order);
    }
    updateState(order:Order):Observable<Order>{
        const uri=`${this.domain}`;
        const toupdate={
            id:order.Id,
            State:order.State
        }
        return this.http
            .get(uri,toupdate)
            .map(res=>res as Order);
    }

     //delete删除
     del(order:Order):Observable<Order>{
        const uri=`${this.domain}/${order.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Order);
    }

    get(): Observable<Order[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Order[]);
    }
    getOrder(id):Observable<Order>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Order);
    }

    getByStudent(id):Observable<Order[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'studentId':id})
        .map(res=>res as Order[]);
    }

    getByPost(id,state,key,page:Page):Observable<PageResult>{
        const uri=`${this.domain}`;
        const params={
            postId:id,
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
    getByKey(id,key):Observable<OrderVM[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'postId':id,key:key})
        .map(res=>res as OrderVM[]);
    }
    getDetailsByDate(postid:string,data:OrderFilterData,key:string,page:Page):Observable<PageResult>{
        const uri=`${this.domain}/GetDetailsByDate`;
        const params={
            postid:postid,
            startDate:data.startDate,
            endDate:data.endDate,
            productIds:JSON.stringify(data.productIds),
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
   
}