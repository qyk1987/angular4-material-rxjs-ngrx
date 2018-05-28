import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CoreModule} from './core/core.module';
import {ShareModule} from './share/share.module';
import {AppComponent } from './app.component';
import {LoginModule}from './login/login.module';
import {StudentModule}from './student/student.module';

import{OrderModule} from './order/order.module';
import{AccountModule} from './account/account.module';
import{PostModule} from './post/post.module';
import{SchoolModule} from './school/school.module';
import{ProductModule} from './product/product.module';
import{MyserviceModule} from './myservice/myservice.module';
import{DiplomaModule} from './diploma/diploma.module';
import{CouponModule} from './coupon/coupon.module';

import {StaffModule} from './staff/staff.module';
import {HomeModule} from './home/home.module';
import {ReportModule} from './report/report.module';
import {TeachModule} from './teach/teach.module';
@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    ShareModule,
    LoginModule,
    StudentModule,

    OrderModule,
    CoreModule,
    AccountModule,
    PostModule,
    SchoolModule,
    ProductModule,
    StaffModule,
    MyserviceModule,
    DiplomaModule,
    CouponModule,
    HomeModule,
    ReportModule,
    TeachModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
