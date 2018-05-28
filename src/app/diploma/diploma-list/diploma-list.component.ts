import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewDiplomaComponent} from '../new-diploma/new-diploma.component';

import { Student,Diploma, StuFilter, Auth, Page } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as dipActions from  '../../actions/diploma.action' ;
import {Store} from '@ngrx/store';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class DiplomaListComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  currentPage:number;
  diplomas$:Observable<Diploma[]>;
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  setting={
    columns:[
      {filed:'DiplomaName',title:'证书名称'},
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
    
    this.diplomas$=this.store$.select(fromRoot.getDiplomasByPage);
    this.diplomas$.subscribe(data=>this.length=data.length);
   }

  ngOnInit() {
    this.store$.dispatch( new dipActions.LoadByPageAction(this.page));
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
   handleClickItem(diploma){
    const dialogRef=this.dialog.open( 
      NewDiplomaComponent,
      {data:{diploma:diploma}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new dipActions.UpdateAction({...diploma,DiplomaName:val.DiplomaName,DiplomaState:val.DiplomaState}));
      }
    });
   }

   handleAdd(){
    const dialogRef=this.dialog.open( 
      NewDiplomaComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new dipActions.AddAction(val));
      }
    });
   }

   handleDel(diploma){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"删除确认",content:`确认要删除学校：${diploma.DiplomaName}吗?`}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new dipActions.DeleteAction(diploma));
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
    this.store$.dispatch( new dipActions.LoadByPageAction(page));
  }
}
