import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { StudentListComponent } from './student-list/student-list.component';
import {StudentRoutingModule} from './student-routing.module';
import { NewStudentComponent } from './new-student/new-student.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { StudentItemComponent } from './student-item/student-item.component';
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
@NgModule({
  imports: [
    ShareModule,
    StudentRoutingModule
  ],
  declarations: [StudentListComponent, NewStudentComponent, UploadImgComponent, StudentItemComponent, AddCertificateComponent, StudentDetailComponent],
  entryComponents:[NewStudentComponent,UploadImgComponent,AddCertificateComponent]
})
export class StudentModule { }
