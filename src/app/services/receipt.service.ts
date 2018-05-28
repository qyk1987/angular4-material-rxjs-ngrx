import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Receipt, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class ReceiptService  {
    
    private readonly domain="receipts";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(receipt:Receipt):Observable<Receipt>{
        const uri=`${this.domain}`;
        return this.http
            .post(uri,receipt)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(receipt:Receipt):Observable<Receipt>{
        const uri=`${this.domain}/${receipt.Id}`;
        return this.http
            .put(uri,receipt)
            .map(res=>res);
    }

     //delete删除
     del(receipt:Receipt):Observable<Receipt>{
        const uri=`${this.domain}/${receipt.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Receipt);
    }

    get(): Observable<Receipt[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Receipt[]);
    }
    getReceipt(id):Observable<Receipt>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Receipt);
    }

    getReceiptDetails(id):Observable<any>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res);
    }
    getReceiptDetailsBySell(id):Observable<any>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'postid':id})
            .map(res=>res);
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

    getRemind(puid:string):Observable<boolean>{
        const uri=`${this.domain}/GetRemind`;
        const params={
            puid:puid
        }
        return this.http
        .get(uri,params)
        .map(res=>res as boolean);
    }
   
    setRemind(puid:string):Observable<boolean>{
        const uri=`${this.domain}/SetRemind`;
        const params={
            puid:puid
        }
        return this.http
        .get(uri,params)
        .map(res=>res as boolean);
    }

    Remind(receipt):Observable<Receipt>{
        const uri=`${this.domain}/RemindByAccount`;
        const params={
            recid:receipt.Id
        }
        return this.http
        .get(uri,params)
        .map(res=>{
            return {
                ...res,
                Value:receipt.Value,
                CheckUserId:receipt.CheckUserId
            } as Receipt
        });
    }
}