import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewSpotComponent} from '../new-spot/new-spot.component';
import { NewCampusComponent } from '..//new-campus/new-campus.component';
import { NewDistrictComponent } from '../new-district/new-district.component';
import { NewPostComponent } from '../new-post/new-post.component';
import { Student,Spot, StuFilter, Auth, Page, Menu } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as disActions from  '../../actions/district.action' ;
import * as camActions from  '../../actions/campus.action' ;
import * as spotActions from  '../../actions/spot.action' ;
import * as menuActions from  '../../actions/menu.action' ;
import * as userActions from  '../../actions/user.action' ;
import * as postActions from  '../../actions/post.action' ;
import {Store} from '@ngrx/store';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { ChartTreeComponent } from '../../share/chart-tree/chart-tree.component';
import {DistrictService} from '../../services/district.service'

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class SpotListComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  currentPage:number;
  posts$:Observable<any[]>;
  level=-1;
  id='0';
  page:Page={
    pageSize:5,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  setting={
    columns:[
      {filed:'PostName',title:'岗位名称'},
      
      {filed:'username',title:'在岗人'},
      
      {filed:'state',title:'状态'},
      {filed:'CreateTime',title:'创建时间',format:"date"},
    ],
    class:[true,true,true,false],
    showAdd:true,
    showDelete:true
  }
  length:number;
  menu$:Observable<any[]>;
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,
    private service$:DistrictService,
    private store$:Store<fromRoot.State>
  ) {
    this.store$.dispatch( new camActions.LoadAction(null));
    this.store$.dispatch( new disActions.LoadAction(null));
    this.store$.dispatch(new spotActions.LoadAction(null));
    this.store$.dispatch(new userActions.LoadAction(null));
    //this.store$.dispatch(new postActions.LoadAction(null));
    this.store$.dispatch(new menuActions.SelectAction({level:this.level,id:this.id}));
    
    
    
   }

  ngOnInit() {
    const data={
      level:this.level,
      id:this.id,
      page:this.page
    }
    this.store$.dispatch(new postActions.LoadByPageAction(data));
    this.posts$=this.store$.select(fromRoot.getPostsByPage);
    this.posts$.subscribe(data=>{
      this.length=data.length;
      //console.log(data);
    });
    //this.store$.dispatch( new spotActions.LoadByPageAction(this.page));
    this.store$.dispatch(new menuActions.LoadDistrictAction(null));
    this.menu$=this.store$.select(fromRoot.getOrganization);
    //this.menu$.subscribe(menu=>console.log(menu));
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  handlePageChange(page){
    this.page=page;
    this.getData();
   }
   handleSelect(data){
      this.level=data.level;
      this.id=data.item.Id;
      this.page={...this.page,currentPage:1};
      this.store$.dispatch(new menuActions.SelectAction({level:this.level,id:this.id}));
      this.getData();
   }
   handleAdd(data){
      if(data.level==0){
        const dialogRef=this.dialog.open( 
          NewCampusComponent,
          {data:{}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new camActions.AddAction({...val,DistrictID:data.item.Id}));
          }
        });
      }else if(data.level==1){
        const dialogRef=this.dialog.open( 
            NewSpotComponent,
            {data:{}});
          dialogRef.afterClosed().take(1).subscribe(val => {
            if (val) {
              //console.log(val);
              this.store$.dispatch(new spotActions.AddAction({...val,CampusID:data.item.Id}));
            }
          });
      }
   }


 handleEdit(data){
   if(data.level==0){
    const dialogRef=this.dialog.open( 
      NewDistrictComponent,
      {data:{district:data.item}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        
        this.store$.dispatch(new disActions.UpdateAction({...data.item,DistrictName:val.DistrictName,DistrictState:val.DistrictState}));
      }
    });

   }
   else if(data.level==1){
    const dialogRef=this.dialog.open( 
      NewCampusComponent,
      {data:{campus:data.item}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new camActions.UpdateAction({...data.item,CampusName:val.CampusName,CampusAddress:val.CampusAddress,CampusState:val.CampusState}));
      }
    });
  }else if(data.level==2){
    const dialogRef=this.dialog.open( 
        NewSpotComponent,
        {data:{spot:data.item}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          //console.log(val);
          this.store$.dispatch(new spotActions.UpdateAction({...data.item,SpotName:val.SpotName,SpotState:val.SpotState}));
        }
      });
  }
 }
 
   handleDel(data){
    if(data.level==0){
      const dialogRef=this.dialog.open( 
        ConfirmDialogComponent,
        {data:{title:"删除确认",content:`确认要删除大区：${data.item.DistrictName}吗?`}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new disActions.DeleteAction(data.item));
          }
      });
    }else if(data.level==1){
      const dialogRef=this.dialog.open( 
        ConfirmDialogComponent,
        {data:{title:"删除确认",content:`确认要删除校区：${data.item.CampusName}吗?`}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new camActions.DeleteAction(data.item));
          }
      });
    }else if(data.level==2){
      const dialogRef=this.dialog.open( 
        ConfirmDialogComponent,
        {data:{title:"删除确认",content:`确认要删除服务点：${data.item.SpotName}吗?`}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new spotActions.DeleteAction(data.item));
          }
      });
    }
    
   }

   addDistrict(ev:Event){
    ev.stopPropagation();
    const dialogRef=this.dialog.open( 
      NewDistrictComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new disActions.AddAction(val));
      }
    });
   }

  openTreeDialog(ev:Event){
    this.service$.getTree().take(1).subscribe(data=>{
     const dialogRef=this.dialog.open( 
       ChartTreeComponent,
       {data:{data:data,title:"组织结构图"}});
     
    });
  }
   getData(){
    const data={
      level:this.level,
      id:this.id,
      page:this.page
    }
    //console.log(data);
    this.store$.dispatch( new postActions.LoadByPageAction(data));
  }

  handleAddPost(){
   
    const dialogRef=this.dialog.open( 
      NewPostComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.select(fromRoot.getSelectedPost).take(1)
        .subscribe(duty=>{
          
          this.store$.dispatch(new postActions.AddAction({...val,UserId:val.users[0].Id,CreaterId:duty.Id}));
        })
        
      }
    });
  }

  handleDelPost(post){
    
     const dialogRef=this.dialog.open( 
       ConfirmDialogComponent,
       {data:{title:"删除确认",content:`确认要删除岗位：${post.PostName}吗?`}});
     dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new postActions.DeleteAction(post));
      }
     });
   }
   handleClickItem(post){
    const dialogRef=this.dialog.open( 
      NewPostComponent,
      {data:{post:post}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.select(fromRoot.getSelectedPost).take(1)
        .subscribe(duty=>{
          
          this.store$.dispatch(new postActions.UpdateAction({...val,CreateTime:post.CreateTime,CreaterId:post.CreaterId,Id:post.Id,UserId:val.users[0].Id,postid:duty.Id}));
        })
        
      }
    });
   }
}
