import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewStudentComponent} from '../new-student/new-student.component';

import { Student,School, StuFilter, Auth, Page } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/student.action' ;
import * as schActions from  '../../actions/school.action' ;
import * as dipActions from  '../../actions/diploma.action' ;
import * as filterAction from  '../../actions/stuFilter.action' ;
import * as searchAction from  '../../actions/search.action' ;
import * as pageAction from  '../../actions/page.action' ;
import {Store} from '@ngrx/store';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class StudentListComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  private readonly avatarName='avatar';
  students$:Observable<Student[]>;
  listAnim$:Observable<number>;
  sub:Subscription;
  // filter$:Observable<StuFilter> ;
  schools$:Observable<School[]>;
  auth$:Observable<Auth>;
  currentPage:number;
  page:Page={
    pageSize:20,
    currentPage:1,
    order:'Name',
    count:0,
    isAsc:false
  };
  key=null;
  filter;
  f;
  page$:Observable<Page>;
  canadd$:Observable<boolean>;
  settings = {
    columns:[
      {filed:'Name',title:'姓名'},
      {filed:'gradeName',title:'年级'},
      {filed:'majorName',title:'专业'},
      {filed:'school',title:'学校'},
      {filed:'educationName',title:'学历'},
      {filed:'MobilePhoneNO',title:'手机号'},
      {filed:'QQ',title:'QQ'}
    ],
    class:[true,true,true,false],
    showPageNum:true,
    pageNums:[10,25,50,100,'all'],
    showExport:true,
    showColumns:true
 
};
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,
    private studentService$:StudentService,
    private store$:Store<fromRoot.State>
    ) {

      this.canadd$=this.store$.select(fromRoot.getSelectedPost).map(duty=>duty.RoleId!=="12fd21b9-4eac-4ae9-a6f8-d8c085f8ddd4");
      this.store$.select(fromRoot.getSelectedPost).take(1)
      .subscribe(duty=>{
        this.f={
          postIds:duty.Ids,
          gradeIds:[],
          introIds:[],
          majorIds:[],
          schoolIds:[],
          eduIds:[]
        };
        
        const data={
          filter:{
            postIds:duty.Ids,
            gradeIds:[],
            introIds:[],
            majorIds:[],
            schoolIds:[],
            eduIds:[]
          },
          key:"",
          page:this.page
        }
        this.store$.dispatch(new filterAction.ChangeAction(data.filter));
        this.store$.dispatch(new actions.LoadByFilterAction(data));        
        this.studentService$.getFilter(duty.Ids).subscribe(sf=>{
          this.filter={...sf,postIds:duty.Ids};
          this.cd.markForCheck();
        });
      })//获取数据

      this.auth$=this.store$.select(fromRoot.getAuth);
      this.schools$=this.store$.select(fromRoot.getSchools);

      //this.page$=this.store$.select(fromRoot.getPage);
      
      
     // this.store$.dispatch(new filterAction.LoadStuFilterAction("2"));
      this.students$=this.store$.select(fromRoot.getStudentsWithAllInfo);
      //this.key$=this.store$.select(fromRoot.getKey);
      
      this.listAnim$=this.students$.map(p=>p.length);
     }


   


  
  ngOnInit() {

    


    this.store$.select(fromRoot.getKey).subscribe(key=>this.key=key);
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  openNewStudentDialog(){
    const img=`${this.avatarName}:svg-${Math.floor(Math.random()*16).toFixed(0)}`;
    const dialogRef=this.dialog.open( 
      NewStudentComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.select(fromRoot.getSelectedPost).take(1)
        .subscribe(duty=>{
          this.store$.dispatch(new actions.AddAction({...val,SignerId:duty.Id, Province:val.Address.province,City:val.Address.city,District:val.Address.district,WorkPlace:val.Address.street}));          
        })
       // console.log(val);
      }
    });
  }
 
 handleDetailClick(student:Student){
    // ev.preventDefault();
    // ev.stopPropagation();
    this.store$.dispatch(new actions.SelectAction(student));
 }

 //帅选器改变事件
 handleFilterChange(filter:StuFilter){
   this.key="";
   this.f=filter;
   this.store$.dispatch(new filterAction.ChangeAction(filter));//帅选器存入reducer
   this.store$.select(fromRoot.getPage).take(1)
   .subscribe(page=>{
    const data={
      filter:filter,
      key:this.key,
      page:{...page,currentPage:1}
    }
    if(filter.postIds.length>0&&this.page.order!==null) 
        {
          this.store$.dispatch(new actions.LoadByFilterAction(data));
        }
   });
  
    
   //this.store$.dispatch(new pageAction.RefreshAction(null));
 }
 handlePageChange(page){
  this.store$.select(fromRoot.getStuFilter).take(1)
    .subscribe(filter=>{
      const data={
        filter:filter,
        key:this.key,
        page:page
      }
      this.store$.dispatch(new actions.LoadByFilterAction(data));
    });
 }
 handleSearch(){
   //console.log(this.key);
    // if(this.key.length<=4){
    //   return false;
    // }
    this.store$.select(fromRoot.getPage).take(1)
    .subscribe(page=>{
     const data={
       filter:this.f,
       key:this.key,
       page:{...page,currentPage:1}
     }
     if(this.key!=null &&this.key.length>0){
      this.store$.dispatch(new actions.LoadByFilterAction(data));
    }else{
      this.store$.select(fromRoot.getSelectedPost)
        .take(1)
        .subscribe(duty=>{
          this.store$.dispatch(new actions.LoadByIntorAction(duty.Ids));
        })
      
    }
    });
    
   
 }

 handleChangeNum(num){
  this.store$.select(fromRoot.getPage).take(1)
  .subscribe(page=>{
   const data={
     filter:this.f,
     key:this.key,
     page:{...page,currentPage:1,pageSize:num==='all'?page.count:num}
   }
      this.store$.dispatch(new actions.LoadByFilterAction(data));

  });
 }

}
