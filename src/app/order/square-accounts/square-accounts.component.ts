import { Component, OnInit,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {NewOrderComponent} from '../new-order/new-order.component'
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/order.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as cartActions from  '../../actions/cart.action' ;
import {Store} from '@ngrx/store';
import { Product, Order, Page, Auth, Compensation } from '../../domain';
import { StatisticData } from '../../vm';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { NewCompensationComponent } from '../../order/new-compensation/new-compensation.component';
import { CompensationService } from '../../services/compensation.service';
import { ReceiptService } from '../../services/receipt.service';
import { ReceiptDetailComponent } from '../../account/receipt-detail/receipt-detail.component';
@Component({
  selector: 'app-square-accounts',
  templateUrl: './square-accounts.component.html',
  styleUrls: ['./square-accounts.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class SquareAccountsComponent implements OnInit {
  selectedTab = 0;
  
  @HostBinding('@router') state;
  sub:Subscription;
  orders$:Observable<Order[]>;
  products$:Observable<Product[]>;
  listAnim$: Observable<number>;
  key:string="";
  length:number;
  cansms:boolean=false;
  statistic$:Observable<StatisticData[]>;
  auth:Auth;
  sum={
    count:0,
    debt:0,
    pay:0,
    discount:0
  };
  page:Page={
    pageSize:6,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  labels=['全部订单','未结账','待结账','已结清','有欠费','补费待结'];
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,   
    private store$:Store<fromRoot.State>,
    private comService$:CompensationService,
    private recService$:ReceiptService
  ) { 
    this.store$.select(fromRoot.getAuth).take(1)
      .subscribe(auth=>{
        
        this.auth=auth;
      });
    
    this.orders$=this.store$.select(fromRoot.getOrdersByDuty);
    this.orders$.subscribe(o=>{
      console.log(o);
      this.length=o.length;
    });



    this.statistic$=this.store$.select(fromRoot.getStatistic);
    this.statistic$.subscribe(st=>{
      if(st!==null&&typeof(st) !== "undefined"&&st.length>0){
        this.sum.count=st.map(s=>s.Count).reduce(function(prev, cur, index, arr) {
              return prev+cur;
          });
        this.sum.debt=st.map(s=>s.Debt).reduce(function(prev, cur, index, arr) {
            return prev+cur;
          });
        this.sum.pay=st.map(s=>s.Pay).reduce(function(prev, cur, index, arr) {
            return prev+cur;
          });
        this.sum.discount=st.map(s=>s.Discount).reduce(function(prev, cur, index, arr) {
            return prev+cur;
          });
      }
      
    });
  }
  ngOnInit() {

      const data={
        postid:this.auth.currentDutyId,
        state:this.selectedTab-1,
        key:"",
        page:this.page
      }
      this.store$.dispatch( new actions.LoadByPostAction(data));

  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  onTabChange(index) {
    this.key="";
    this.selectedTab = index;
    this.getData(1);
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
  handleApplyAccount(order){
    const update={
      ...order,
      State:1
    };
    this.store$.dispatch(new actions.UpdateStateAction(update));
  }
  handleDelete(order){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"撤单确认",content:"确定要撤销该订单吗？"}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new actions.DeleteAction(order));
      }
    });
  }
  // handleEdit(order:Order){
  //   this.store$.dispatch( new cartActions.ChangeSetAction([{StudentID:order.StudentID,ProductIds:order.ProductIds}]));
  //   const dialogRef=this.dialog.open( 
  //     NewOrderComponent,
  //     {data:{order:order}});
  // }
  handleCompenssion(order:Order){
    const dialogRef=this.dialog.open( 
      NewCompensationComponent,
      {data:{debt:order.Debt}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const com={
          OrderID:order.Id,
          Value:val.Value,
          FeeType:0,
          State:false,
          Channel:val.Channel,
          CreateTime:new Date(),
          ReceiptID:null
        }
        this.store$.dispatch(new actions.AddCompensationAction(com));
      }
    });
  }
  handleDelCps(com){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"撤销补费确认",content:"确定要撤销该次补费吗？"}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new actions.DeleteCompensationAction(com));
      }
    });
  }

  handleEditCps(com:Compensation,debt){
    const dialogRef=this.dialog.open( 
      NewCompensationComponent,
      {data:{debt:debt,compensation:com}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const update={
          Id:com.Id,
          OrderID:com.OrderID,
          Value:val.Value,
          FeeType:0,
          State:false,
          Channel:val.Channel,
          CreateTime:com.CreateTime,
          ReceiptID:null
        }
        this.store$.dispatch(new actions.UpdateCompensationAction(update));
      }
    });
  }

  sendSms(){
    this.recService$.setRemind(this.auth.currentDutyId).take(1)//发送短信提醒
    .subscribe(foo=>this.cansms=foo);
  }

  handleDetail(receipt){
    this.recService$.getReceiptDetailsBySell(this.auth.currentDutyId).take(1)
      .subscribe(data=>{
        const dialogRef=this.dialog.open( 
          ReceiptDetailComponent,
          {data:{details:data,account:false}});
        // dialogRef.afterClosed().take(1).subscribe(val => {
        //     if (val) {
        //       this.handledueAccount(receipt);
        //     }
        //   });
      });
  }

  getData(index){
    if(this.selectedTab===2){
      this.recService$.getRemind(this.auth.currentDutyId).take(1)
      .subscribe(foo=>this.cansms=foo);//获取是否能够短信提醒
    }
    const data={
      postid:this.auth.currentDutyId,
      state:this.selectedTab-1,
      key:this.key,
      page:{...this.page,currentPage:index}
    }
    //console.log(data);
    this.store$.dispatch( new actions.LoadByPostAction(data));
  }
}
