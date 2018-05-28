import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DirectiveModule} from '../directive/directive.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {}from '@angular/cdk'
import {MdToolbarModule,
        MdIconModule,
        MdButtonModule,
        MdCardModule, 
        MdInputModule,
        MdListModule,
        MdSlideToggleModule,
        MdGridListModule,
        MdDialogModule,
        MdAutocomplete,
        MdAutocompleteModule,
        MdMenuModule,
        MdCheckboxModule,
        MdTooltipModule,
        MdDatepickerModule,
        MdRadioModule,
        MdNativeDateModule,
        MdSelectModule,
        MdSidenavModule,
        MdButtonToggleModule,
        MdChipsModule,
        MdTabsModule,
        MdProgressBarModule
        } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { AreaListComponent } from './area-list';
import { StudentFilterComponent } from './student-filter/student-filter.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StudentChipsListComponent } from './student-chips-list/student-chips-list.component';
import { ProductChipsListComponent } from './product-chips-list/product-chips-list.component';
import { OrderInputComponent } from './order-input/order-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PageComponent } from './page/page.component';
import { TableComponent } from './table/table.component';
import { ChartTreeComponent } from './chart-tree/chart-tree.component';
import { MenuTreeComponent } from './menu-tree/menu-tree.component';
import { ServiceChipsListComponent } from './service-chips-list/service-chips-list.component';
import { CouponChipsListComponent } from './coupon-chips-list/coupon-chips-list.component';
import { CampusChipsListComponent } from './campus-chips-list/campus-chips-list.component';
import{SexPipe} from '../pipe/sex.pipe';
import {MomentModule} from "angular2-moment";
import { MessageBoxComponent } from './message-box/message-box.component';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { NvaItemComponent } from './nva-item/nva-item.component';
import { FeeComponent } from './fee/fee.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdTabsModule,
    Ng2SmartTableModule,
    ChartsModule,
    NgxEchartsModule,
    MomentModule,
    MdProgressBarModule
    

  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdProgressBarModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    MdButtonToggleModule,
    ChipsListComponent,
    MdChipsModule,
    MdTabsModule,
    AreaListComponent,
    StudentFilterComponent,
    ScheduleComponent,
    Ng2SmartTableModule,
    StudentChipsListComponent,
    ProductChipsListComponent,
    OrderInputComponent,
    ChartsModule,
    DateInputComponent,
    NgxEchartsModule,
    PageComponent,
    TableComponent,
    MenuTreeComponent,
    ChartTreeComponent,
    ServiceChipsListComponent,
    CouponChipsListComponent,
    CampusChipsListComponent,
    SexPipe,
    MomentModule,
    MessageBoxComponent,
    OrderFilterComponent,
    NavListComponent,
    NvaItemComponent,
    FeeComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent, 
    ChipsListComponent, 
    AreaListComponent,
    StudentFilterComponent, 
    ScheduleComponent, 
    StudentChipsListComponent, 
    ProductChipsListComponent, 
    OrderInputComponent, 
    DateInputComponent, 
    PageComponent, 
    TableComponent, 
    ChartTreeComponent, 
    MenuTreeComponent,  
    ServiceChipsListComponent,
     CouponChipsListComponent,
     CampusChipsListComponent,
     SexPipe,
     MessageBoxComponent,
     OrderFilterComponent,
     NavListComponent,
     NvaItemComponent,
     FeeComponent
  ],
  entryComponents:[
    ConfirmDialogComponent,
    ChartTreeComponent,
    MessageBoxComponent,
    FeeComponent
  ]
})
export class ShareModule { }
