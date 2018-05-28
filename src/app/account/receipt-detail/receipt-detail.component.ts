import { Component, OnInit, Inject, Input } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.scss']
})
export class ReceiptDetailComponent implements OnInit {
  title = "结账单";
  selectedTab = 0;
  orders = [];
  name = {};
  dest1 = [];
  channel = {};
  dest2 = [];
  channels = this.baseData.channel;
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    @Inject('BASE_DATA') public baseData,
    private dialogRef: MdDialogRef<ReceiptDetailComponent>,
  ) { }

  ngOnInit() {
    if (this.data.details.Orders !== null) {
      this.orders = this.data.details.Orders.map(o => {
        return {
          ...o,
          Price: o.ActualPay + o.Debt
        }
      });
      var d1 = [];


      for (var i = 0; i < this.orders.length; i++) {
        var ai = this.orders[i];
        if (!this.name[ai.ProductName]) {
          d1.push({
            productName: ai.ProductName,
            data: [ai]
          });
          this.name[ai.ProductName] = 1;
        } else {
          for (var j = 0; j < d1.length; j++) {
            var dj = d1[j];
            if (dj.productName === ai.ProductName) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      console.log(d1);
      this.dest1 = d1.map(d => {
        return {
          name: d.productName,
          count: d.data.map(p => p.Count).reduce(function (prev, cur, index, arr) {
            return prev + cur;
          }),
          actualPay: d.data.map(p => p.ActualPay).reduce(function (prev, cur, index, arr) {
            return prev + cur;
          }),
          debt: d.data.map(p => p.Debt).reduce(function (prev, cur, index, arr) {
            return prev + cur;
          }),
          discount: d.data.map(p => p.Discount).reduce(function (prev, cur, index, arr) {
            return prev + cur;
          })
        }
      });
    }
    if (this.data.details.Cashiers !== null) {
      this.dest2 = this.data.details.Cashiers.map(d => {
        return {
          channel: this.channels[d.Channel].name,

          actualPay: d.Value
        }
      });

    }


  }

  orderSetting = {
    columns: [
      { filed: 'StudentName', title: '姓名' },
      { filed: 'ProductName', title: '产品', sort: "asc" },
      { filed: 'Count', title: '数量',total: true },
      { filed: 'Price', title: '应收', total: true },
      { filed: 'ActualPay', title: '实收', total: true },
      { filed: 'Debt', title: '欠费', total: true },
      { filed: 'Discount', title: '优惠', total: true },
      { filed: 'OrderDate', title: '下单日期', format: "date" },
      { filed: 'TradeNo', title: '收据编号' }
    ],
    class: [true, true, true, false],
    hasTotal: true
  }

  nameSetting = {
    columns: [
      { filed: 'name', title: '产品' },
      { filed: 'count', title: '数量', sort: "asc" },
      { filed: 'actualPay', title: '实收', total: true },
      { filed: 'debt', title: '欠费', total: true },
      { filed: 'discount', title: '优惠', total: true },
    ],
    class: [true, true, true, false],
    hasTotal: true
  }

  channelSetting = {
    columns: [
      { filed: 'channel', title: '收款方式' },
      { filed: 'actualPay', title: '实收', total: true },

    ],
    class: [true, true, true, false],
    hasTotal: true
  }

  feeSetting = {
    columns: [
      { filed: 'StudentName', title: '姓名' },
      { filed: 'Debt', title: '欠费' },
      { filed: 'Value', title: '补费' },
      { filed: 'FeeDate', title: '日期', format: "date" }

    ],
    class: [true, true, true, false]
  }
  acount() {
    this.dialogRef.close(true);
  }
  prevTab() {
    // this.key="";
    this.selectedTab = this.selectedTab - 1;
    // this.getData(1);
  }
  nextTab() {
    // this.key="";
    this.selectedTab = this.selectedTab + 1;
    //this.getData(1);
  }
  onTabChange(index) {
    //  this.key="";
    this.selectedTab = index;
    // this.getData(1);
  }
}
