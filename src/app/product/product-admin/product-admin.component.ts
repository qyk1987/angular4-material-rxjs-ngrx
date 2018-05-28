import { Component, OnInit ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewCategoryComponent} from '../new-category/new-category.component';
import { NewSubjectComponent } from '../new-subject/new-subject.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { Student,Spot, StuFilter, Auth, Page, Menu } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as catActions from  '../../actions/category.action' ;
import * as subActions from  '../../actions/subject.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as menuActions from  '../../actions/menu.action' ;
import * as serActions from  '../../actions/service.action' ;
import * as couActions from  '../../actions/coupon.action' ;
import {Store} from '@ngrx/store';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { ChartTreeComponent } from '../../share/chart-tree/chart-tree.component';
import {DistrictService} from '../../services/district.service'

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
  animations:[
    routerAnimate,listAnimate
  ],
})
export class ProductAdminComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  currentPage:number;
  products$:Observable<any[]>;
  level=-1;
  id='0';
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  setting={
    columns:[
      {filed:'ProductName',title:'产品名称'},
      
      {filed:'Price',title:'价格'},
      {filed:'discount',title:'老学员优惠'},
      {filed:'package',title:'类型'},
      {filed:'state',title:'状态'},
      {filed:'CreateDate',title:'上架时间',format:"date"},
      {filed:'OverDate',title:'下架时间',format:"date"},
    ],
    class:[true,true,true,false],
    showAdd:false,
    showEdit:true,
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
    this.store$.dispatch( new catActions.LoadAction(null));
    this.store$.dispatch( new subActions.LoadAction(null));
    //this.store$.dispatch( new prdActions.LoadAction(null));
    this.store$.dispatch( new couActions.LoadAction(null));
    this.store$.dispatch( new serActions.LoadAction(null));
    const data={
      level:this.level,
      id:this.id,
      page:this.page
    }
    this.store$.dispatch(new menuActions.SelectAction({level:this.level,id:this.id}));
    
    
   }

  ngOnInit() {
    //this.store$.dispatch( new spotActions.LoadByPageAction(this.page));
    this.store$.dispatch(new menuActions.LoadCategoryAction(null));
    this.menu$=this.store$.select(fromRoot.getCategoryTree);
    const data={
      level:this.level,
      id:this.id,
      page:this.page
    }
    this.store$.dispatch(new prdActions.LoadByPageAction(data));
    this.products$=this.store$.select(fromRoot.getProductsByPage);
    this.products$.subscribe(data=>{
      this.length=data.length;
      console.log(data);
    });
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

   addCategory(){
    const dialogRef=this.dialog.open( 
      NewCategoryComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new catActions.AddAction(val));
      }
    });
   }
   handleAdd(data){
      if(data.level==0){
        const dialogRef=this.dialog.open( 
          NewSubjectComponent,
          {data:{}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new subActions.AddAction({...val,CategoryId:data.item.Id}));
          }
        });
      }else if(data.level==1){
        const dialogRef=this.dialog.open( 
            NewProductComponent,
            {data:{}});
          dialogRef.afterClosed().take(1).subscribe(val => {
            if (val) {
              //console.log(val);
              this.store$.dispatch(new prdActions.AddAction({...val,SubjectId:data.item.Id}));
            }
          });
      }
   }


 handleEdit(data){
   if(data.level==0){
    const dialogRef=this.dialog.open( 
      NewCategoryComponent,
      {data:{category:data.item}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        
        this.store$.dispatch(new catActions.UpdateAction({...data.item,CategoryName:val.CategoryName,State:val.State}));
      }
    });

   }
   else if(data.level==1){
    const dialogRef=this.dialog.open( 
      NewSubjectComponent,
      {data:{subject:data.item}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new subActions.UpdateAction({...data.item,Name:val.Name,State:val.State}));
      }
    });
  }
 }
 
   handleDel(data){
    if(data.level==0){
      const dialogRef=this.dialog.open( 
        ConfirmDialogComponent,
        {data:{title:"删除确认",content:`确认要删除大类：${data.item.CategoryName}吗?`}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new catActions.DeleteAction(data.item));
          }
      });
    }else if(data.level==1){
      const dialogRef=this.dialog.open( 
        ConfirmDialogComponent,
        {data:{title:"删除确认",content:`确认要删除科目：${data.item.Name}吗?`}});
        dialogRef.afterClosed().take(1).subscribe(val => {
          if (val) {
            this.store$.dispatch(new subActions.DeleteAction(data.item));
          }
      });
    }
    
   }

   addProduct(){
    
    const dialogRef=this.dialog.open( 
      NewProductComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new prdActions.AddAction({...val,SubjectId:this.id}));
      }
    });
   }
   handleDelPrd(product){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"删除确认",content:`确认要删除产品：${product.ProductName}吗?`}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new prdActions.DeleteAction(product));
        }
    });
   }
   handleEditPrd(product){
     console.log(product);
    const dialogRef=this.dialog.open( 
      NewProductComponent,
      {data:{product:product}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        //console.log(val);
        this.store$.dispatch(new prdActions.UpdateAction({
          ...product,
          ProductName:val.ProductName,
          Desc:val.Desc,
          Price:val.Price,
          IsDiscountForOld:val.IsDiscountForOld,
          DiscountValue:val.DiscountValue,
          IsPackage:val.IsPackage,
          products:val.products,
          Coupons:val.Coupons,
          Services:val.Services,
          State:val.State,
          packageproducts:val.packageproducts
        }));
      }
    });
   }
   handleClickItem(product){

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
    this.store$.dispatch( new prdActions.LoadByPageAction(data));
  }
}
