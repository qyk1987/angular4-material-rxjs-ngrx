import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
//import {NewUserComponent} from '../new-user/new-user.component';

import { Student,User, StuFilter, Auth, Page } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as userActions from  '../../actions/user.action' ;
import {Store} from '@ngrx/store';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class UserListComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  currentPage:number;
  users$:Observable<User[]>;
  page:Page={
    pageSize:5,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  setting={
    columns:[
      {filed:'Name',title:'姓名'},
      {filed:'UserName',title:'用户名'},
      {filed:'PhoneNumber',title:'手机号'},
    ],
    class:[true,true,true,false],
   // showAdd:true,
   // showDelete:true
  }
  length:number;
  
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,
    
    private store$:Store<fromRoot.State>
  ) {
    
    this.users$=this.store$.select(fromRoot.getUsersByPage);
    this.users$.subscribe(data=>this.length=data.length);
   }

  ngOnInit() {
    this.store$.dispatch( new userActions.LoadByPageAction(this.page));
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
   handleClickItem(user){
    // const dialogRef=this.dialog.open( 
    //   NewUserComponent,
    //   {data:{user:user}});
    // dialogRef.afterClosed().take(1).subscribe(val => {
    //   if (val) {
    //     console.log(val);
    //     this.store$.dispatch(new schActions.UpdateAction({...user,UserName:val.UserName}));
    //   }
    // });
   }

  //  handleAdd(){
  //   const dialogRef=this.dialog.open( 
  //     NewUserComponent,
  //     {data:{}});
  //   dialogRef.afterClosed().take(1).subscribe(val => {
  //     if (val) {
  //       //console.log(val);
  //       this.store$.dispatch(new schActions.AddAction(val));
  //     }
  //   });
  //  }

  //  handleDel(user){
  //   const dialogRef=this.dialog.open( 
  //     ConfirmDialogComponent,
  //     {data:{title:"删除确认",content:`确认要删除学校：${user.UserName}吗?`}});
  //     dialogRef.afterClosed().take(1).subscribe(val => {
  //       if (val) {
  //         this.store$.dispatch(new schActions.DeleteAction(user));
  //       }
  //   });
  //  }

   getData(page){
    // const data={
    //   postid:this.auth.currentDutyId,
    //   state:this.selectedTab-1,
    //   key:this.key,
    //   page:{...this.page,currentPage:index}
    // }
    //console.log(data);
    this.store$.dispatch( new userActions.LoadByPageAction(page));
  }
}
