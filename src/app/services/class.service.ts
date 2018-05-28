import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import { Page,Class, MenuVM} from '../domain';
import { PageResult } from '../vm';
import { ChargerVM, ClassVM,CanAddStudent } from '../vm/class.vm';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import { addHours } from 'date-fns';

@Injectable()
export class ClassService  {
    
    private readonly domain="classes";
    private headers=new Headers({    //定义请求头
        'Content-Type':'application/json'
    });
    private campusid=null;
    constructor(private http:HttpService,private store$:Store<fromRoot.State>){
        
      
    }
    getMenu(): Observable<MenuVM[]>{
            const uri=`${this.domain}/GetMenu`;
            return this.store$.select(fromRoot.getSelectedPost).take(1)
            .switchMap(duty=>{
                const params={
                    campusid:duty.CampusId,
                    postid:duty.RoleName==='ClassCharger'?duty.PostId:0
                }
                return  this.http
                .get(uri,params)
                .map(res=>res as MenuVM[]);
        })
            

            
        }

    //POST增加
    add(cla:Class):Observable<Class>{
        const uri=`${this.domain}`;
        const add={...cla};
        return this.http
            .post(uri,add)
            .map(res=>res);
    }

    //put会修改所有值   patch可以只修改某些值
    update(cla:Class):Observable<Class>{
        const uri=`${this.domain}/${cla.Id}`;
        const toupdate=[
            { "op": "replace", "path": "/ClassName", "value": cla.ClassName },
            { "op": "replace", "path": "/ProductID", "value": cla.ProductID },
            { "op": "replace", "path": "/ChargerID", "value": cla.ChargerID },
            { "op": "replace", "path": "/OverDate", "value": cla.OverDate},
            { "op": "replace", "path": "/Arrange", "value": cla.Arrange },
            { "op": "replace", "path": "/ClassState", "value": cla.ClassState }
        ]
        return this.http
            .patch(uri,toupdate)
            .map(res=>res);
    }

     //delete删除
     del(cla:Class):Observable<Class>{
        const uri=`${this.domain}/${cla.Id}`;
        return this.http
            .delete(uri)
            .map(res=>res as Class);
    }

    get(): Observable<Class[]>{
        const uri=`${this.domain}`;
        return this.http
            .get(uri)
            .map(res=>res as Class[]);
    }
    getClass(id):Observable<ClassVM>{
        const uri=`${this.domain}/getClass`;
        return this.http
            .get(uri,{'id':id})
            .map(res=>res as ClassVM);
    }

    getChargers(id):Observable<ChargerVM[]>{
        const uri=`${this.domain}/GetChargers`;
        return this.http
            .get(uri,{'campusid':id})
            .map(res=>res as ChargerVM[]);
    }

    getByDistrict(id):Observable<Class[]>{
        const uri=`${this.domain}`;
        return this.http
        .get(uri,{'districtId':id})
        .map(res=>res as Class[]);
    }
    getByPage(productid:string,page:Page): Observable<PageResult>{
        const uri=`${this.domain}/GetByPage`;
        return this.store$.select(fromRoot.getSelectedPost).take(1)
            .switchMap(duty=>{
                const params={
                    'campusid':duty.CampusId,
                    'postid':duty.RoleName==='ClassCharger'?duty.PostId:0,
                    'productid':productid,
                    'pageSize':page.pageSize,
                    'page':page.currentPage,
                    'order':page.order,
                    'isAsc':page.isAsc
                }
                return this.http
                    .get(uri,params)
                    .map(res=>res as PageResult);
        })
        
    }
    getCanAddStudents(id):Observable<CanAddStudent[]>{
        const uri=`${this.domain}/getCanAddStudents`;
        return this.http
            .get(uri,{'classid':id})
            .map(res=>res as CanAddStudent[]);
    }
    addStudents(classid:string,studentids:string[],detailids:string[]):Observable<ClassVM>{
        const uri=`${this.domain}/addStudents`;
        const params={
            classid:classid,
            studentids:JSON.stringify(studentids),
            detailids:JSON.stringify(detailids)
        }
        return this.http
            .get(uri,params)
            .map(res=>res as ClassVM);
    }
   
}