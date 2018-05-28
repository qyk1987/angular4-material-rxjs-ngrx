import { Component, OnInit ,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {NewOrderComponent} from '../new-order/new-order.component'
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/order-detail.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as copActions from  '../../actions/coupon.action' ;
import {Store} from '@ngrx/store';
import { Page, OrderFilterData } from '../../domain';
import { OrderDetailVM } from 'app/vm';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class OrderListComponent implements OnInit {
  @HostBinding('@router') state;
  page:Page={
    pageSize:10,
    currentPage:1,
    order:'Id',
    count:0,
    isAsc:false
  };
  settings={
    columns:[
      {filed:'StudentName',title:'学生姓名'},
      
      {filed:'ProductName',title:'课程'},
      {filed:'ActualPay',title:'实付'},
      {filed:'Discount',title:'优惠'},
      {filed:'Debt',title:'欠费'},
      {filed:'SchoolName',title:'学校'},
      {filed:'SellerName',title:'经办人'},
      {filed:'Date',title:'下单时间',format:"date"},
    ],
    class:[true,true,true,false],
    showAdd:false,
    showEdit:false,
    showDelete:false,
    showPageNum:true,
    pageNums:[10,25,50,100,'all'],
    showExport:true,
    showColumns:true
  }
  key=null;
  data:OrderFilterData;
  details$:Observable<OrderDetailVM[]> ;
  constructor(
    private store$:Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.details$=this.store$.select(fromRoot.getDetailsByPage);
  }

  handleSelect(data){
    this.data=data;
    this.key="";
    this.store$.select(fromRoot.getSelectedPost).take(1)
    .subscribe(duty=>{
      const params={
        postid:duty.PostId,
        data:data,
        key:this.key,
        page:this.page
      }
      this.store$.dispatch(new actions.LoadByDateAction(params));
    })
  }
  handlePageChange(page){
    this.key="";
    this.store$.select(fromRoot.getSelectedPost).take(1)
    .subscribe(duty=>{
      const params={
        postid:duty.PostId,
        data:this.data,
        key:this.key,
        page:page
      }
      this.store$.dispatch(new actions.LoadByDateAction(params));
    })
  }

  handleChangeNum(num){

    this.store$.select(fromRoot.getSelectedPost).take(1)
    .subscribe(duty=>{
      this.store$.select(fromRoot.getPage).take(1)
      .subscribe(page=>{
        const params={
          postid:duty.PostId,
          data:this.data,
          key:this.key,
          page:{...page,currentPage:1,pageSize:num==='all'?page.count:num}
        } 
        this.store$.dispatch(new actions.LoadByDateAction(params));
      });     
    })
   }
}
