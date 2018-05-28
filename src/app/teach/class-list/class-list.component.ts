import { Component, OnInit ,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as claActions from  '../../actions/class.action' ;

import {Store} from '@ngrx/store';
import { Category,Class, Coupon, Page, MenuVM } from '../../domain';
import{NewClassComponent}from '../new-class/new-class.component'
import { ClassService } from '../../services/class.service';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { ClassVM } from '../../vm/class.vm';
import { AddStudentComponent } from '../add-student/add-student.component';
@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class ClassListComponent implements OnInit {
  @HostBinding('@router') state;
  classes$:Observable<Class[]>;
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  pid='0';
  items$:Observable<MenuVM[]>;
  showadd$:Observable<boolean>;
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,   
    private store$:Store<fromRoot.State>,
    private services$:ClassService,
  ) {
    this.showadd$=this.store$.select(fromRoot.getSelectedPost)//设置是否显示增加班级按钮
                  .map(duty=>duty.RoleName==='Dean');
   }

  ngOnInit() {
   this.getData();
   this.store$.dispatch(new claActions.LoadMenuAction(null));
   this.classes$=this.store$.select(fromRoot.getClassesByPage);
   this.items$=this.store$.select(fromRoot.getClassMenu).map(menu=>{
     if(menu===null){
       return null;
     }
     return menu.map(item=>{
       const open=item.lists.map(l=>l.id).indexOf(this.pid)>-1?true:false;
       const ls=item.lists.map(l=>{
         const selected=l.id===this.pid;
         return {
           ...l,
           selected:selected
         };
       });
       return {
         ...item,
         isopen:open,
         lists:ls
       };
     })
   });
  }

  getData(){
      const data={
        productid:this.pid,
        page:this.page
      }
      this.store$.dispatch(new claActions.LoadByPageAction(data))
    
  }

  openNewClassDialog(){
    const dialogRef=this.dialog.open( 
      NewClassComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
       this.store$.select(fromRoot.getSelectedPost).take(1)
       .subscribe(duty=>{
         const data={
          ClassName:val.ClassName,
          ProductID:val.products[0].Id,
          ChargerID:val.ChargerID,
          CampusId:duty.CampusId,
          OverDate:val.OverDate,
          Arrange:val.Arrange,
          StudentCount:0,
          ClassState:val.ClassState
         }
         this.store$.dispatch(new claActions.AddAction(data));
       })
        //this.store$.dispatch(new claActions.AddAction(val));
      }
    });
  }

  handlePageChange(page){
    this.page=page;
    this.getData();
  }

  handleSelect(prd){
    this.pid=prd.id;
    this.setOne();
    this.getData();
  }

  handleSelectAll(){
    this.pid='0';
    this.setOne();
    this.getData();
  }


  setOne(){
    this.page={
      ...this.page,
      currentPage:1
    };
  }
  handleDelete(cla){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"删除确认",content:`确认要删除班级：${cla.ClassName}吗?`}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new claActions.DeleteAction(cla));
        }
    });
  }
  handleAddStudent(cla:ClassVM){
    this.services$.getCanAddStudents(cla.Id).take(1)
      .subscribe(data=>{
        const dialogRef=this.dialog.open( 
          AddStudentComponent,
          {data:{students:data}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            const sids=val.map(d=>d.Id);
            const ordids=val.map(d=>d.OrdId);
            const data={
              classid:cla.Id,
              studentids:sids,
              detailids:ordids
            }
            this.store$.dispatch(new claActions.AddStudentsAction(data));
          }
        });
      })
  }
  handleEdit(cla){
    const dialogRef=this.dialog.open( 
      NewClassComponent,
      {data:{classdata:cla}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        
        this.store$.dispatch(new claActions.UpdateAction({...val,Id:cla.Id,ProductID:val.products[0].Id}));
      }
    });
  }
  handleDetailClick(cla:Class){
    // ev.preventDefault();
    // ev.stopPropagation();
    this.store$.dispatch(new claActions.SelectAction(cla));
 }
}
