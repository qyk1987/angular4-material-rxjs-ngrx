import { Injectable,Inject} from '@angular/core';
import { Http ,Headers} from '@angular/http';
import{Observable} from 'rxjs/Observable';
import { User,Auth,VerifyResult } from '../domain/index';
import {HttpService} from './http.service';
import { ImgCode } from '../vm/imgcode.vm';
@Injectable()
export class AuthService  {
    // private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    //     '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    //     '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    token="";
    private readonly domain="Account";

    constructor(
       
        private http:HttpService
    ){
        
      
    }
   
     //POST增加
     register(user:any):Observable<boolean>{
        //user.Id=null;
        const uri=`${this.domain}/Register`;
        const data={
            UserName:user.UserName,
            Password:user.Password,
            Email:user.Email,
            Name:user.Name
        }
        return this.http
            .postJson(uri,data)
            .map(res=>res);
    
    }

     //POST增加
     resetPwd(number:string,token:string,password:string):Observable<boolean>{
        //user.Id=null;
        const uri=`${this.domain}/RsetPassword`;
        const data={
            UserName:number,
            token:token,
            Password:password
        }
        return this.http
            .postJson(uri,data)
            .map(res=>res);
    
    }


    login(email:string,password:string):Observable<Auth>{
        
        // var model = {
        //     grant_type: 'password',
        //     username: email,
        //     password: password
        // };
        var data="userName=" + encodeURIComponent(email) +
        "&password=" + encodeURIComponent(password) +
        "&grant_type=password";
        //this.headers.append("RequestVerificationToken",token);
        //console.log(this.header.getLoginHeader());
        return this.http
            .postLogin(data)
            .map(res=>
                //console.log(res.json());
                res as Auth
            );
    }

    

    verifyImg(phoneNumber:string,key:string,code:string,type:string):Observable<string>{
        const uri=`${this.domain}/VerifyImgCode`;
        const data={
            phoneNumber:phoneNumber,
            key:key,
            code:code,
            type:type
        }
        return this.http.getJson(uri,data)
        .map(res=>res);
    }
    verifySms(phoneNumber:string,code:string,type:string):Observable<VerifyResult>{
        const uri=`${this.domain}/VerifySmsCode`;
        const data={
            phoneNumber:phoneNumber,
            code:code
        };
        return this.http.getJson(uri,data)
        .map(res=>{
           return {...res,type:type} 
        });
    }
    getCurrentUser():Observable<Auth>{
        const uri=`${this.domain}/UserInfo`;
        return this.http.get(uri)
        .map(res=>res as Auth);    
    }

    getImgCode():Observable<ImgCode>{
        const uri=`${this.domain}/ImgCode`;
        return this.http.getJson(uri)
        .map(res=>res);  
    }
   
}