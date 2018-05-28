import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';

import {CouponRoutingModule} from './coupon-routing.module';

import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponItemComponent } from './coupon-item/coupon-item.component';
import { NewCouponComponent } from './new-coupon/new-coupon.component';
import { InviteProductComponent } from './invite-product/invite-product.component';
import { InviteCampusComponent } from './invite-campus/invite-campus.component';

@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    CouponRoutingModule
  ],
  declarations: [
    
    CouponListComponent, 
    CouponItemComponent, 
    NewCouponComponent, 
    InviteProductComponent,
    InviteCampusComponent,
  ],
  entryComponents:[
    InviteProductComponent,
    InviteCampusComponent,
    NewCouponComponent,
   
  ]
})
export class CouponModule { }