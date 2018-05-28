import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';

import {MyserviceRoutingModule} from './myservice-routing.module';

import { ServiceComponent } from './service/service.component';
import { NewServiceComponent } from './new-service/new-service.component';


@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    MyserviceRoutingModule
  ],
  declarations: [
   
    ServiceComponent, 
    NewServiceComponent, 
    
  ],
  entryComponents:[
    
    NewServiceComponent,
   
  ]
})
export class MyserviceModule { }