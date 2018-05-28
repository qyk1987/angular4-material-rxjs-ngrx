import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReportComponent } from './report/report.component';
import {ReportRoutingModule} from './report-routing.module'
@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    ReportRoutingModule
  ],
  declarations: [ReportComponent],
  entryComponents:[]
})
export class ReportModule { }
