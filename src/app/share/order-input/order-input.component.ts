import { Component, OnInit, Inject, ChangeDetectorRef, forwardRef, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Order, Campus } from '../../domain';
import {MdDialog} from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as cartActions from '../../actions/cart.action';
import { FeeComponent } from '../fee/fee.component'
@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.scss'],

})
export class OrderInputComponent implements OnInit, OnDestroy {
  @Input() order;
  @Input() index;
  sub: Subscription;
  campus$: Observable<Campus[]>;
  private porder: Order;
  channels = this.baseData.channel;
  Channel: string;
  constructor(
    @Inject('BASE_DATA') public baseData,
    private cd: ChangeDetectorRef,
    private dialog:MdDialog,
    private store$: Store<fromRoot.State>
  ) { }
  ngOnInit() {
    this.campus$ = this.store$.select(fromRoot.getCampuses);
    //console.log(this.order);
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }
  addRemark() {
    const payload = {
      StudentID: this.order.StudentID,
      Remark: this.order.Remark
    }
    this.store$.dispatch(new cartActions.AddRemarkAction(payload));
  }
  addTradeNO() {
    const payload = {
      StudentID: this.order.StudentID,
      TradeNO: this.order.TradeNO
    }
    this.store$.dispatch(new cartActions.AddTradeNOAction(payload));
  }
  addChannel() {
    console.log(this.order);
    const value = this.order.ActualPay - (this.order.Cashiers
      .filter(c => c.Channel !== this.Channel)
      .map(c => c.Value)
      .reduce(function (prev, cur, index, arr) {
        return prev + cur;
      },0));//求出本次收款可以收的最大金额
    
    const data = {
      studentName: this.order.student.Name,
      name: this.channels[this.Channel].name,
      value:value
    }
    console.log(data)
    const dialogRef=this.dialog.open( 
      FeeComponent,
      {data:{pay:data}}
    );
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val&&val.Value>0) {
          const data={
            StudentID:this.order.StudentID,
            Channel:this.Channel,
            Value:val.Value
          };
          this.store$.dispatch(new cartActions.AddChannelAction(data));
      }
    });
    
  }
  addCampus(i, id) {
    const payload = {
      StudentID: this.order.StudentID,
      ProductId: id,
      CampusId: this.order.campus[i]
    }
    this.store$.dispatch(new cartActions.AddCampusAction(payload));
  }
  changeActualpay(i, id) {
    this.checkValue(i, id);
    const value = this.order.actualpay[i];
    const payload = {
      StudentID: this.order.StudentID,
      ProductId: id,
      Actualpay: this.order.actualpay[i]
    }
    console.log(payload);
    this.store$.dispatch(new cartActions.ChangeActualpayAction(payload));
  }
  changeCount(i, id) {
   
    let value = this.order.count[i];
    if(value<1){
      value=1;
    }
    const payload = {
      StudentID: this.order.StudentID,
      ProductId: id,
      Count: value
    }
    console.log(payload);
    this.store$.dispatch(new cartActions.ChangeCountAction(payload));
  }
  changeOld(id) {

    const payload = {
      StudentID: this.order.StudentID,
      ProductId: id,
      Forold: !this.order.details[id].IsDiscountForOld
    }
    this.store$.dispatch(new cartActions.ChangeForOldAction(payload));
  }

  cancelDebt(id) {
    const payload = {
      StudentID: this.order.StudentID,
      ProductId: this.order.details[id].ProductId
    }

    this.store$.dispatch(new cartActions.CancelDebtAction(payload));


  }
  changeDebt(i, id) {
    this.checkValue(i, id);
    const value = this.order.debt[i];
    const payload = {
      StudentID: this.order.StudentID,
      ProductId: this.order.OrderDetails[i].ProductId,
      Debt: value
    }
    if (value === 0) {
      this.store$.dispatch(new cartActions.CancelDebtAction(payload));
    } else {
      this.store$.dispatch(new cartActions.ChangeDebtAction(payload));
    }

  }

  checkValue(i, id) {
    const paymax = this.order.details[id].discountPrice*this.order.details[id].Count;
    if (this.order.actualpay[i] > paymax) {
      this.order.actualpay[i] = paymax;
    }
    if (this.order.debt[i] > paymax) {
      this.order.debt[i] = paymax;
    }
    if (this.order.actualpay[i] < 0) {
      this.order.actualpay[i] = 0;
    }
    if (this.order.debt[i] < 0) {
      this.order.debt[i] = 0;
    }
  }
}
