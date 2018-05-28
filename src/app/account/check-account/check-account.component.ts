import { Component, OnInit,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/receipt.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as cartActions from  '../../actions/cart.action' ;
import {Store} from '@ngrx/store';
import { Product, Order, Page, Auth, Compensation, Receipt } from '../../domain';
import { StatisticData } from '../../vm';
import { ConfirmDialogComponent } from '../../share/confirm-dialog/confirm-dialog.component';
import { NewCompensationComponent } from '../../order/new-compensation/new-compensation.component';
import { CompensationService } from '../../services/compensation.service';
import { ReceiptService } from '../../services/receipt.service';
import { ReceiptDetailComponent } from '../receipt-detail/receipt-detail.component';
@Component({
  selector: 'app-check-account',
  templateUrl: './check-account.component.html',
  styleUrls: ['./check-account.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class CheckAccountComponent implements OnInit {
  selectedTab = 0;
  
  @HostBinding('@router') state;
  sub:Subscription;
  receipts$:Observable<Receipt[]>;
  listAnim$: Observable<number>;
  key:string="";
  length:number;
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
  labels=['全部订单','未申请','待结账','已结清','有欠费','补费待结'];
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,   
    private store$:Store<fromRoot.State>,
    private comService$:CompensationService,
    private recService$:ReceiptService
  ) { 
    this.store$.select(fromRoot.getAuth).take(1)
      .subscribe(auth=>this.auth=auth);
    // this.store$.select(fromRoot.getPage).subscribe(page=>{
    //   this.page=JSON.parse(JSON.stringify(page));
    // });//拷贝对象

    this.receipts$=this.store$.select(fromRoot.getReceiptsByDuty);
    this.receipts$.subscribe(o=>{
      this.length=o.length;
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
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
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

  handledueAccount(receipt){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"结账确认",content:`确认金额（￥${receipt.Value}）无误吗？`}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const data={...receipt,ConfirmTime:new Date(),ConfirmerID:this.auth.currentDutyId}
        this.store$.dispatch(new actions.UpdateAction(data));
      }
    });
  }

  handledueBack(receipt){
    const dialogRef=this.dialog.open( 
      ConfirmDialogComponent,
      {data:{title:"打回确认",content:`确认打回该单据吗？`}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const data={...receipt,ConfirmTime:new Date(),ConfirmerID:this.auth.currentDutyId}
        this.store$.dispatch(new actions.UpdateAction(data));
      }
    });
  }
  handleDetail(receipt){
    console.log(receipt);
    this.recService$.getReceiptDetails(receipt.Id).take(1)
      .subscribe(data=>{
        const dialogRef=this.dialog.open( 
          ReceiptDetailComponent,
          {data:{details:data,state:receipt.State,account:true}});
        dialogRef.afterClosed().take(1).subscribe(val => {
            if (val) {
              this.handledueAccount(receipt);
            }
          });
      });
  }

  handleRemind(receipt){
    this.store$.dispatch(new actions.RemindAction(receipt));
  }
  getData(index){
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
