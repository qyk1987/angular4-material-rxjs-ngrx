import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {UserDiploma} from '../domain';

@Injectable()
export class UserDiplomaService  {
    
    private readonly domain="StudentDiplomas";
   
    constructor(private http:HttpService,){
        
      
    }

    //POST增加
    add(userDiploma:UserDiploma):Observable<UserDiploma>{
        const uri=`${this.domain}`;
        return this.http
            .post(uri,userDiploma)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(userDiploma:UserDiploma):Observable<UserDiploma>{
        const uri=`${this.domain}/${userDiploma.Id}`;
        const toUpdate={
            StudentID:userDiploma.StudentID,
            DiplomaID:userDiploma.DiplomaID,
            CreateTime:userDiploma.CreateTime,
            UserDiplomaID:userDiploma.Id
        };
        return this.http
            .put(uri,toUpdate)
            .map(res=>res as UserDiploma );
    }

     //delete删除
     del(userDiploma:UserDiploma):Observable<UserDiploma>{
        const uri=`${this.domain}/${userDiploma.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as UserDiploma);
    }

    get(): Observable<UserDiploma[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as UserDiploma[]);
    }
    getUserDiploma(id):Observable<UserDiploma>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as UserDiploma);
    }
    getByStudent(id):Observable<UserDiploma[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri,{'studentId':id})
            .map(res=>res as UserDiploma[]);
    }
}