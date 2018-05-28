import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { MdDialog } from '@angular/material';
import { Product, Spot, Student, Order, Campus } from '../../domain';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as campusActions from '../../actions/campus.action';
import * as prdActions from '../../actions/product.action';
import * as cartActions from '../../actions/cart.action';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MessageBoxComponent } from '../../share/message-box/message-box.component';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  title = "报名";
  campus$: Observable<Campus[]>;
  productName: string;
  price: number;
  form: FormGroup;
  orders$: Observable<any[]>;
  length$: Observable<number>;
  error: boolean = false;
  edit: boolean = false;
  errortext = "";
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private dialogRef: MdDialogRef<NewOrderComponent>,
    @Inject('BASE_DATA') private baseData,
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    private dialog: MdDialog,
  ) {


  }

  ngOnInit() {
    this.orders$ = this.store$.select(fromRoot.getCartsWithAll);
    if (this.data.order != null) {
      this.edit = true;

      this.orders$.take(1)
        .subscribe(c => {
          console.log(c);
          const products = this.data.order.products;

          this.form = this.fb.group({

            products: [products]

          });

        });
    } else {

      this.orders$.take(1)
        .subscribe(c => {

          const students = c.map(o => o.student);
          if (this.data.product !== null) {
            this.form = this.fb.group({
              students: [students],
              products: [[this.data.product]]
            });
          } else {
            this.form = this.fb.group({
              students: [students],
              products: ['']
            });
          }

        });
    }

    const students = this.form.get('students');
    const products = this.form.get('products');
    var items;
    const students$ = students.valueChanges
      .do((s: Student[]) => {
        items = s;
        var myreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        products.value.forEach(p => {//判断输入的学生有无身份证号，没有身份证号不允许报名某些课程
          if (p.IsNeedCardNo) {
            s.forEach(stu => {
              if (!myreg.test(stu.IdCardNO)) {
                const dialogRef = this.dialog.open(
                  MessageBoxComponent,
                  { data: { title: "请注意", content: `【${stu.Name}】同学没有填写身份证号，不能报名《${p.ProductName}》课程！` } });
                const ids = items.map(item => item.Id);
                const i = ids.indexOf(stu.Id);
                items = [...items.slice(0, i), ...items.slice(i + 1)];
              }
            })
          }
        });
      })
      .map((s:Student[])=>{//比对删除后的学生数组跟删除之前的长度是否一致  如果一至说明没有非法的
        if(s.length>items.length){
          this.form.patchValue({students:items});
          return null;
        }else{
          return s.map(st=>st.Id)
        }
      })
      .filter(s=>s!==null)
      .map(s=> s.map(id => { return { StudentID: id, ProductIds: products.value.map(p => p.Id) } }))
      .subscribe(s => {
        //console.log(s);
        if (products.value.length <= 0) {
          const dialogRef = this.dialog.open(
            MessageBoxComponent,
            { data: { title: "请注意", content: `请先选择课程产品!` } });
          return false;
        }
        this.error=false;
        this.store$.dispatch(new cartActions.ChangeSetAction(s));
      });

    this.length$ = this.orders$.map(o => o.length);
    this.store$.select(fromRoot.getSaveOrders)
      .subscribe(orders => {
        if (!orders.map(o => o.TradeNO).includes("")) {
          this.error = false;
        }
      });
  }

  saveOrders() {

    this.store$.select(fromRoot.getSaveOrders).take(1)
      .subscribe(orders => {
        console.log(orders);
        if (orders.map(o => o.TradeNO).includes("")) {
          const dialogRef = this.dialog.open(
            MessageBoxComponent,
            { data: { title: "请注意", content: `请填写收据编号！` } });
        }else if(orders.filter(o=>o.ActualPay>o.total).length>0){
          const dialogRef = this.dialog.open(
            MessageBoxComponent,
            { data: { title: "请注意", content: `还有学生款项未收清` } });
        } else {
          this.store$.dispatch(new cartActions.SaveOrdersAction(orders));
          this.dialogRef.close();
        }
        //
      });

  }

}
