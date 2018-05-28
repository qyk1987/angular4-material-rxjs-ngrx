import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { ClassListComponent } from './class-list/class-list.component';
import {TeachRoutingModule} from './teach-routing.module';
import { NewClassComponent } from './new-class/new-class.component';
import { ClassItemComponent } from './class-item/class-item.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
@NgModule({
  imports: [
    ShareModule,
    TeachRoutingModule
  ],
  declarations: [ClassListComponent, NewClassComponent, ClassItemComponent, AddStudentComponent, ClassDetailComponent],
  entryComponents:[NewClassComponent,AddStudentComponent]
})
export class TeachModule { }
