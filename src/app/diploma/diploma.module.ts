import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';

import {DiplomaRoutingModule} from './diploma-routing.module';

import { DiplomaListComponent } from './diploma-list/diploma-list.component';
import { NewDiplomaComponent } from './new-diploma/new-diploma.component';


@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    DiplomaRoutingModule
  ],
  declarations: [
    
    DiplomaListComponent, 
    NewDiplomaComponent, 
  ],
  entryComponents:[
   
    NewDiplomaComponent
  ]
})
export class DiplomaModule { }