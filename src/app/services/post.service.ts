
import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Post, Page} from '../domain';
import { PageResult } from '../vm';

@Injectable()
export class PostService  {
    
    private readonly domain="posts";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(post:Post):Observable<Post>{
        const uri=`${this.domain}`;
        const add={
           ...post,CreateDate:new Date(),State:true,
        };
        
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(post:any):Observable<Post>{
        const uri=`${this.domain}/${post.Id}`;
        
        const update={
            Post:post,
            PostId:post.postid
        };
        console.log(update);
        return this.http
            .put(uri,update)
            .map(res=>res);
    }

     //delete删除
     del(post:Post):Observable<Post>{
        const uri=`${this.domain}/${post.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Post);
    }

    get(): Observable<Post[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Post[]);
    }
    getPost(id):Observable<Post>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as Post);
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
   
}