import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';

import {QuoteService} from './quote.service';


import {AuthGuardService} from './auth-guard.service';
import {UserService} from './user.service';
import {MyCalService} from './my-cal.service';
import {StudentService} from './student.service';
import {SchoolService} from './school.service';
import {DiplomaService} from './diploma.service';
import {UserDiplomaService} from './userDiploma.service';
import {DistrictService} from './district.service';
import {CampusService} from './campus.service';
import {SpotService} from './spot.service';
import {CategoryService} from './category.service';
import {SubjectService} from './subject.service';
import {ProductService} from './product.service';
import {ServiceService} from './service.service';
import {CouponService} from './coupon.service';
import {OrderService} from './order.service';
import {ChartService} from './chart.service';
import {CompensationService} from './compensation.service';
import {ReceiptService} from './receipt.service';
import {PostService} from './post.service';
import {HttpService} from './http.service';
import {RoleService} from './role.service';
import {ClassService} from './class.service';
export {
  AuthGuardService,
  AuthService,
  QuoteService,
  UserService,
  MyCalService,
  StudentService,
  SchoolService,
  DiplomaService,
  UserDiplomaService,
  DistrictService,
  CampusService,
  SpotService,
  CategoryService,
  SubjectService,
  ProductService,
  ServiceService,
  CouponService,
  OrderService,
  ChartService,
  CompensationService,
  ReceiptService,
  PostService,
  HttpService,
  RoleService,
  ClassService
}

@NgModule()
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthGuardService,
        AuthService,
        QuoteService,
        UserService,
        MyCalService,
        StudentService,
        SchoolService,
        DiplomaService,
        UserDiplomaService,
        UserDiplomaService,
        DistrictService,
        CampusService,
        SpotService,
        CategoryService,
        SubjectService,
        ProductService,
        ServiceService,
        CouponService,
        OrderService,
        ChartService,
        CompensationService,
        ReceiptService,
        PostService,
        HttpService,
        RoleService,
        ClassService
      ]
    };
  }
}
