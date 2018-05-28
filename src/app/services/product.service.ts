import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Product, Page, CategoryWithCount, ProductWithCount} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class ProductService  {
    
    private readonly domain="products";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(product:Product):Observable<Product>{
        const uri=`${this.domain}`;
        //console.log(product);
        const add={
            SubjectId:product.SubjectId,
            ProductName:product.ProductName,
            Desc:product.Desc,
            State:true,
            OverDate:product.OverDate,
            Price:product.Price,
            IsDiscountForOld:product.IsDiscountForOld,
            DiscountValue:product.IsDiscountForOld?product.DiscountValue:0,
            AccordIdList:product.IsDiscountForOld?product.products.map(p=>p.Id).join(','):"",
            IsPackage:product.IsPackage,
            PackageIdList:product.IsPackage?product.packageproducts.map(p=>p.Id).join(','):"",
            Sort:1,
            CoverImg:"",
            SaleCount:0,
            Coupons:product.Coupons.map(c=>{
                return {
                    CouponId:c.Id,
                    ProductId:0
                };
            }),
            Services:product.Services.map(s=>{
                return {
                    ProductId:0,
                    ServiceId:s.Id,
                    Sort:1
                }
            })
        }
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(product):Observable<Product>{
        const uri=`${this.domain}/${product.Id}`;
        const toupdate={
            Id:product.Id,
            SubjectId:product.SubjectId,
            ProductName:product.ProductName,
            Desc:product.Desc,
            State:product.State,
            OverDate:product.OverDate,
            CreateDate:product.CreateDate,
            Price:product.Price,
            IsDiscountForOld:product.IsDiscountForOld,
            DiscountValue:product.DiscountValue,
            IsPackage:product.IsPackage,
            Sort:product.Sort,
            IsNeedCardNo:product.IsNeedCardNo,
            CoverImg:product.CoverImg,
            SaleCount:product.SaleCount,
            couponIds:product.Coupons.map(c=>c.Id),
            serviceIds:product.Services.map(s=>s.Id),
            PackageIdList:product.packageproducts.map(p=>p.Id).join(','),
            AccordIdList:product.products.map(p=>p.Id).join(','),
        }
        return this.http
            .put(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(product:Product):Observable<Product>{
        const uri=`${this.domain}/${product.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Product);
    }

    get(): Observable<Product[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Product[]);
    }
    getProduct(id):Observable<Product>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Product);
    }

    getBySubject(id):Observable<Product[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'subjectId':id,'foo':false})
        .map(res=>res as Product[]);
    }
    getWithCouponByCampus(campusId):Observable<Product[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'campusId':campusId,})
        .map(res=>res as Product[]);
    }
    getByPage(level,id,page:Page): Observable<PageResult>{
        const uri=`${this.domain}`;
        const params={
            'level':level,
            'id':id,
            'pageSize':page.pageSize,
            'page':page.currentPage,
            'order':page.order,
            'isAsc':page.isAsc
        }
        return this.http
            .get(uri,params)
            .map(res=>res as PageResult);
    }
    getMenu():Observable<any>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'menu':1})
            .map(res=>res );
    }


    getProdByPost(postid:string,startDate,endDate):Observable<ProductWithCount[]>{
        const uri=`${this.domain}/GetProdByPost`;
        const params={
            'postid':postid,
            'startDate':startDate,
            'endDate':endDate
        }
        return this.http
            .get(uri,params)
            .map(res=>res as ProductWithCount[]);
    }
   
}