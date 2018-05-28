import { Component, OnInit ,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as camActions from  '../../actions/campus.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as couActions from  '../../actions/coupon.action' ;
import {Store} from '@ngrx/store';
import { Category, Coupon, Page } from '../../domain';
import { NewCouponComponent } from '../new-coupon/new-coupon.component';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { InviteProductComponent } from '../invite-product/invite-product.component';
import { InviteCampusComponent } from '../invite-campus/invite-campus.component';
@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class CouponListComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  selectedTab = 0;
  sub:Subscription;
  coupons$:Observable<any[]>;
  listAnim$: Observable<number>;
  labels=['正在使用','已过期'];
  page:Page={
    pageSize:4,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  key:string="";
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,   
    private store$:Store<fromRoot.State>
  ) { 
    this.store$.dispatch( new prdActions.LoadAction(null));
    this.store$.dispatch( new camActions.LoadAction(null));


    this.coupons$=this.store$.select(fromRoot.getCouponssByPage);
    this.listAnim$=this.coupons$.map(p=>p.length);
  }

  ngOnInit() {

    const data={
      state:this.selectedTab===0,
      key:"",
      page:this.page
    }
    this.store$.dispatch( new couActions.LoadByPageAction(data));
  }


  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  prevTab() {
    this.key="";
    this.selectedTab = this.selectedTab-1;
    this.getData(1);
  }
  nextTab() {
    this.key="";
    this.selectedTab = this.selectedTab+1;
    this.getData(1);
  }
  handleSearch(){
    if(this.key!=null &&this.key.length>0){
      this.getData(1);
    }
   
  }
  handlePageChange(page){
    this.page=page;
    this.getData(page.currentPage);
   }
  onTabChange(index) {
    this.key="";
    this.selectedTab = index;
    this.getData(1);
  }
  // openInviteDialog(product){
  //   const dialogRef=this.dialog.open( 
  //     NewOrderComponent,
  //     {data:{product:product}});
  // }

  getData(index){
    const data={
      state:this.selectedTab===0,
      key:this.key,
      page:{...this.page,currentPage:index}
    }
    //console.log(data);
    this.store$.dispatch( new couActions.LoadByPageAction(data));
  }
  openNewCouponDialog(){
    const dialogRef=this.dialog.open( 
      NewCouponComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new couActions.AddAction(val));
      }
    });
  }
  handleEditCoupon(coupon){
    const dialogRef=this.dialog.open( 
      NewCouponComponent,
      {data:{coupon:coupon}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new couActions.UpdateAction({...coupon,
          CouponName:val.CouponName,
          Vlaue:val.Vlaue,
          Rule:val.Rule,
          State:val.State,
          OverDate:val.OverDate
        }));
      }
    });
  }

  handleDelete(coupon){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"删除确认",content:`确认要删除优惠券：${coupon.CouponName}吗?`}});
      dialogRef.afterClosed().take(1).subscribe(val => {
        if (val) {
          this.store$.dispatch(new couActions.DeleteAction(coupon));
        }
    });
  }
  openInviteProductDialog(coupon){
    const dialogRef=this.dialog.open( 
      InviteProductComponent,
      {data:{members:coupon.Products}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const data={
          ...coupon,
          Products:val
        }
        this.store$.dispatch(new couActions.InviteProductsAction(data));
      }
    });
  }

  openInviteCampusDialog(coupon){
    const dialogRef=this.dialog.open( 
      InviteCampusComponent,
      {data:{members:coupon.Campuses}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const data={
          ...coupon,
          Campuses:val
        }
        this.store$.dispatch(new couActions.InviteCampusesAction(data));
      }
    });
  }
}
