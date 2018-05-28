import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef,forwardRef, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import { ProductService } from 'app/services/product.service';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  differenceInCalendarDays,
  isValid,
  isFuture,
  differenceInQuarters,
  differenceInWeeks,
  subWeeks,
  addDays
}from 'date-fns';
import { ProductWithCount,OrderFilterData } from '../../domain';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import { MessageBoxComponent } from '../../share/message-box/message-box.component';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFilterComponent implements OnInit, OnDestroy {

  _data:OrderFilterData={
    startDate:subDays(new Date(),7),
    endDate:new Date(),
    productIds:[]
  };
  products: any[];
  _startDate = new Subject<Date>();
  _endDate = new Subject<Date>();
  selectAll=true;
  private _sub: Subscription;
  @Output() select=new EventEmitter<OrderFilterData>();
  constructor(
    private service$:ProductService,
    private store$:Store<fromRoot.State>,
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,
  ) {
    
   }

  ngOnInit() {
    const start$ = this._startDate.asObservable().startWith(subDays(new Date(),7));
    const end$ = this._endDate.asObservable().startWith(new Date());
    const date$ = Observable.combineLatest([start$, end$], (_s, _e) => {
      return {
        startDate: _s,
        endDate: _e
      };
    });
    this._sub = date$.subscribe(v => {
      this.getProducts(v);
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  getProducts(date){
    this.store$.select(fromRoot.getSelectedPost)
    .take(1)
    .subscribe(duty=>{
      console.log(1212)
      this.service$.getProdByPost(duty.PostId,date.startDate,date.endDate).take(1)
      .subscribe(d=>{
        this.selectAll=true;
        this.products=d.map(p=>{
          return {
            ...p,
            selected:true
          }
        });
        this.cd.markForCheck();
        this.selectChange();
      });
    })
  }

  onStartChange(date){
    //console.log(date);
      this._startDate.next(date);
    
    
  }
  onEndChange(date){
    
    this._endDate.next(date);
  }

  onClickCheckbox(i){
    this.products[i].selected=!this.products[i].selected;
    this.checkAll();
    this.selectChange();
  }
    
  onClickAll(){
    this.selectAll=!this.selectAll;
    if(this.selectAll){
      this.selAll();
    }else{
      this.cancelAll();
    }
    this.selectChange();
  }


  selAll(){
      this.products.forEach(p=>p.selected=true);
      
  }
  cancelAll(){
    this.products.forEach(p=>p.selected=false);
    
  }
  checkAll(){
    if(this.products.filter(p=>!p.selected).length>0){
      this.selectAll=false;
    }else{
      this.selectAll=true;
    }
    
  }

  selectChange(){
    const data:OrderFilterData={
       startDate:this._data.startDate,
       endDate:this._data.endDate,
       productIds:this.products.filter(p=>p.selected).map(p=>p.Id)
    }
    if(data.productIds===null||data.productIds.length===0){
      return ;
    }
    this.select.emit(data);
  }

  startFilter = (d: Date): boolean => {
    //console.log(this._data.endDate);
    return d<this._data.endDate;
  }

  endFilter = (d: Date): boolean => {
    //console.log(this._data.endDate);
    return d<=new Date()&&d>this._data.startDate;
  }
 
}
