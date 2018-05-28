import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { SchoolComponent } from './school/school.component';
import {SchoolRoutingModule} from './school-routing.module';
import { NewSchoolComponent } from './new-school/new-school.component';



@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    SchoolRoutingModule
  ],
  declarations: [
    SchoolComponent, 
    NewSchoolComponent, 
 
    
  ],
  entryComponents:[
    NewSchoolComponent,

    

  ]
})
export class SchoolModule { }
