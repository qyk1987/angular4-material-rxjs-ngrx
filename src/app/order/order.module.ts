import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProductListComponent } from './product-list/product-list.component';
import {OrderRoutingModule} from './order-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { SquareAccountsComponent } from './square-accounts/square-accounts.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { DataAnalyseComponent } from './data-analyse/data-analyse.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { NewCompensationComponent } from './new-compensation/new-compensation.component';
import { OrderListComponent } from './order-list/order-list.component';
@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    OrderRoutingModule
  ],
  declarations: [ProductListComponent, ProductItemComponent, NewOrderComponent, SquareAccountsComponent, OrderItemComponent, DataAnalyseComponent, EditOrderComponent, NewCompensationComponent, OrderListComponent],
  entryComponents:[NewOrderComponent,EditOrderComponent,NewCompensationComponent]
})
export class OrderModule { }
