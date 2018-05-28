import { Injectable,Inject} from '@angular/core';
import { Http ,Headers,Response,RequestOptions} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import { User,Auth } from '../domain/index';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import { environment } from '../../environments/environment';
@Injectable()
export class HttpService  {
    constructor(private http:Http,private store$:Store<fromRoot.State>){
    }
    private jsonHeader=new Headers({    
        'Content-Type':'application/json'
    });
    private apiuri=environment.apiuri;
    private uri=environment.uri;
    private loginHeader=new Headers({    //定义请求头
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });


    putJson(action,data): Observable<any>{
        return this.http
        .put(this.apiuri+action,JSON.stringify(data),{headers:this.jsonHeader})
        .map(res=>res.json());
    }
    postJson(action,data): Observable<any>{
        return this.http
        .post(this.apiuri+action,JSON.stringify(data),{headers:this.jsonHeader})
        .map(res=>res.json());
    }
    getJson(action,data?): Observable<any>{
        return this.http
        .get(this.apiuri+action,{params:data?data:null})
        .map(res=>res.json());
    }
    
    delJson(action,data): Observable<any>{
        return this.http
        .delete(this.apiuri+action)
        .map(res=>res.json());
    }

    postLogin(data): Observable<any>{
        return this.http
        .post(this.uri+"token",data,{headers:this.loginHeader})
        .map(res=>res.json());
    }

    get(action,data?): Observable<any>{
        return this.store$.select(fromRoot.getAuth).take(1)
        .switchMap(auth=>{    
            var headers = new Headers();
            headers.append("Authorization", `Bearer ${auth.access_token}`);
            let options = new RequestOptions(data?{headers:headers,params:data}:{headers:headers}); 
            
            //console.log(options);
            return this.http
            .get(this.apiuri+action,options)
            .map(res=>res.json() ); 
        });       
    }
    post(action,data): Observable<any>{
        return this.store$.select(fromRoot.getAuth).take(1)
        .switchMap(auth=>{    

            var headers = new Headers();
            headers.append("Authorization", `Bearer ${auth.access_token}`);
            headers.append("Content-Type", "application/json");
            let options = new RequestOptions({headers:headers});
            return this.http
            .post(this.apiuri+action,JSON.stringify(data),options)
            .map(res=>res.json() ); 
        });       
    }
    put(action,data): Observable<any>{
        return this.store$.select(fromRoot.getAuth).take(1)
        .switchMap(auth=>{    
            var headers = new Headers();
            headers.append("Authorization", `Bearer ${auth.access_token}`);
            headers.append("Content-Type", "application/json");
            let options = new RequestOptions({headers:headers});
            //console.log(headers)
            return this.http
            .put(this.apiuri+action,JSON.stringify(data),options)
            .map(res=>res.json() ); 
        });       
    }

    patch(action,data): Observable<any>{
        return this.store$.select(fromRoot.getAuth).take(1)
        .switchMap(auth=>{    
            var headers = new Headers();
            headers.append("Authorization", `Bearer ${auth.access_token}`);
            headers.append("Content-Type", "application/json-patch+json");
            let options = new RequestOptions({headers:headers});
            //console.log(headers)
            return this.http
            .patch(this.apiuri+action,JSON.stringify(data),options)
            .map(res=>res.json() ); 
        });       
    }
    delete(action): Observable<any>{
        return this.store$.select(fromRoot.getAuth).take(1)
        .switchMap(auth=>{    
            var headers = new Headers();
            headers.append("Authorization", `Bearer ${auth.access_token}`);
            headers.append("Content-Type", "application/json");
            let options = new RequestOptions({headers:headers});
            return this.http
            .delete(this.apiuri+action,options)
            .map(res=>res.json() ); 
        });       
    }
}