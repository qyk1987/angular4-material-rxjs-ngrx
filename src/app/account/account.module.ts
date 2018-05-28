import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import{AccountRoutingModule} from './account-routing.module';
import { CheckAccountComponent } from './check-account/check-account.component';
import { ReceiptItemComponent } from './receipt-item/receipt-item.component';
import { ReceiptDetailComponent } from './receipt-detail/receipt-detail.component';


@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    AccountRoutingModule
  ],
  declarations: [CheckAccountComponent, ReceiptItemComponent, ReceiptDetailComponent],
  entryComponents:[ReceiptDetailComponent]
})
export class AccountModule { }
