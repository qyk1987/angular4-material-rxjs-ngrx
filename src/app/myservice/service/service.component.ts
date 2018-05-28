import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewServiceComponent} from '../new-service/new-service.component';

import { Student,Service, StuFilter, Auth, Page } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as schActions from  '../../actions/service.action' ;
import {Store} from '@ngrx/store';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class ServiceComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  currentPage:number;
  services$:Observable<Service[]>;
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  setting={
    columns:[
      {filed:'ServiceName',title:'服务名称'},
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
    this.services$=this.store$.select(fromRoot.getServicesByPage);
    this.services$.subscribe(data=>this.length=data.length);
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
   handleClickItem(service){
    const dialogRef=this.dialog.open( 
      NewServiceComponent,
      {data:{service:service}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        console.log(val);
        this.store$.dispatch(new schActions.UpdateAction({...service,ServiceName:val.ServiceName,State:val.State}));
      }
    });
   }

   handleAdd(){
    const dialogRef=this.dialog.open( 
      NewServiceComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new schActions.AddAction(val));
      }
    });
   }

   handleDel(Service){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"删除确认",content:`确认要删除服务：${Service.ServiceName}吗?`}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new schActions.DeleteAction(Service));
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
