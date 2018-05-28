import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewSchoolComponent} from '../new-school/new-school.component';

import { Student,School, StuFilter, Auth, Page } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as schActions from  '../../actions/school.action' ;
import {Store} from '@ngrx/store';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class SchoolComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  currentPage:number;
  schools$:Observable<School[]>;
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  setting={
    columns:[
      {filed:'SchoolName',title:'学校名称'},
      {filed:'CreateDate',title:'添加时间',format:"date"},
    ],
    class:[true,true,true,false],
    showAdd:true,
    showDelete:true
  }
  length:number;
  
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,
    
    private store$:Store<fromRoot.State>
  ) {
    
    this.schools$=this.store$.select(fromRoot.getSchoolsByPage);
    this.schools$.subscribe(data=>this.length=data.length);
   }

  ngOnInit() {
    this.store$.dispatch( new schActions.LoadByPageAction(this.page));
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  handlePageChange(page){
    this.page=page;
    this.getData(page);
   }
   handleClickItem(school){
    const dialogRef=this.dialog.open( 
      NewSchoolComponent,
      {data:{school:school}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        console.log(val);
        this.store$.dispatch(new schActions.UpdateAction({...school,SchoolName:val.SchoolName}));
      }
    });
   }

   handleAdd(){
    const dialogRef=this.dialog.open( 
      NewSchoolComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new schActions.AddAction(val));
      }
    });
   }

   handleDel(school){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"删除确认",content:`确认要删除学校：${school.SchoolName}吗?`}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new schActions.DeleteAction(school));
        }
    });
   }

   getData(page){
    // const data={
    //   postid:this.auth.currentDutyId,
    //   state:this.selectedTab-1,
    //   key:this.key,
    //   page:{...this.page,currentPage:index}
    // }
    //console.log(data);
    this.store$.dispatch( new schActions.LoadByPageAction(page));
  }
}
