import { Component, OnInit ,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as claActions from  '../../actions/class.action' ;
import * as stuActions from  '../../actions/student.action' ;
import { ClassService } from '../../services/class.service';
import {Store} from '@ngrx/store';
import { Category,Class, Coupon, Page, MenuVM, Student } from '../../domain';
import { ClassVM } from '../../vm/class.vm';
import { ToggleData } from '../../vm';
@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class ClassDetailComponent implements OnInit {
  @HostBinding('@router') state;

  cla$:Observable<ClassVM>;
  students$:Observable<Student[]>;
  cid;
  key:string="";
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  settings;
  isshowtable=false;
  form:FormGroup;
  constructor(
    private store$:Store<fromRoot.State>,
    private services$:ClassService,
    private fb:FormBuilder,
  ) {
    this.cla$=this.store$.select(fromRoot.getSelectedClass);
    this.cla$.take(1)
    .subscribe(c=>{
      this.store$.dispatch(new claActions.GetAction(c.Id));
      this.cid=c.Id;
      const data={
        classid:c.Id,
        key:"",
        page:this.page
      }
      this.store$.dispatch(new stuActions.LoadByClassAction(data));
    });
    this.cla$.skip(1).take(1)
      .subscribe(c=>{
        let colums=[
          {filed:'Name',title:'姓名'},
          {filed:'gradeName',title:'年级'},
          {filed:'MobilePhoneNO',title:'手机号'},
          {filed:'QQ',title:'QQ号'},
          {filed:'school',title:'学校'},
          {filed:'EnrollDate',title:'进班时间',format:"date"}
        ];
        const sercols=c.Services===null?[]:c.Services.map(s=>{
           return {filed:s.Id,title:s.ServiceName,format:"toggle",enabled:c.enableToggle};
        });
        colums=[...colums,...sercols];
        console.log(c);
        this.settings={
          columns:colums,
          class:[true,true,true,false],
          showPageNum:true,
          pageNums:[10,25,50,100,'all'],
          showExport:true,
          showColumns:true
      };
      this.isshowtable=true;
      });
   }

  ngOnInit() {
    this.form=this.fb.group({
      key:[],
      
    });
    this.students$=this.store$.select(fromRoot.getStudentsByClass);
    const key=this.form.get('key');
    const key$=key.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(key=>{
        this.key=key;
        const data={
          classid:this.cid,
          key:key,
          page:this.page
        }
        this.store$.dispatch(new stuActions.LoadByClassAction(data));
      })
      
  }
  handleChangeNum(num){
    this.store$.select(fromRoot.getPage).take(1)
    .subscribe(page=>{
     const data={
       classid:this.cid,
       key:this.key,
       page:{...page,currentPage:1,pageSize:num==='all'?page.count:num}
     }
        this.store$.dispatch(new stuActions.LoadByClassAction(data));
  
    });
  }
  handlePageChange(page){

        const data={
          classid:this.cid,
          key:this.key,
          page:page
        }
        this.store$.dispatch(new stuActions.LoadByClassAction(data));
 
  }

  handleSearch(){
    if(this.key!=null &&this.key.length>0){
      const data={
        classid:this.cid,
        key:this.key,
        page:this.page
      }
      this.store$.dispatch(new stuActions.LoadByClassAction(data));
    }

   
  }
  handleToggle(data:ToggleData){
    this.store$.select(fromRoot.getSelectedPost).take(1)
      .subscribe(duty=>{
        const payload={
          postuserid:duty.Id,
          serviceid:data.filed,
          enrollmentid:data.item.EnrollmentId,
          state:data.item[data.filed]
        };
        this.store$.dispatch(new stuActions.UpdateServiceAction(payload));
      })
  }
  handleclick(data){
    console.log(111);
  }
}
