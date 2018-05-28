import { Component, OnInit,Inject ,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {UploadImgComponent} from '../upload-img/upload-img.component';
import { StudentService } from '../../services/student.service';
import { Subscription } from 'rxjs/Subscription';
import { routerAnimate } from '../../animates/router.animate';
import {MdDialog} from '@angular/material';
import {NewStudentComponent} from '../new-student/new-student.component';
import {AddCertificateComponent} from '../add-certificate/add-certificate.component';
import { listAnimate } from '../../animates/list.animate';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/student.action' ;
import * as schActions from  '../../actions/school.action' ;
import * as dipActions from  '../../actions/userDiploma.action' ;
import { Student,School, Order } from '../../domain/index';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  animations:[
    routerAnimate
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StudentDetailComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  sub:Subscription;
  students$:Observable<Student[]>;
  diplomas$:Observable<any>;
  stu$:Observable<Student>;
  orders$:Observable<any>;
  defaultImg=this.baseData.defaultImg;
  constructor(private cd:ChangeDetectorRef,
    private store$:Store<fromRoot.State>,
    @Inject('BASE_DATA') private baseData,
    private dialog:MdDialog,) {
      this.students$=this.store$.select(fromRoot.getStudentsWithAllInfo);
      this.stu$=this.store$.select(fromRoot.getStudentWithAll);
      this.diplomas$=this.store$.select(fromRoot.getStudentDiplomas);
      this.orders$=this.store$.select(fromRoot.getStudentProducts);
      //this.stu$.subscribe(s=>console.log(s));
     }

  ngOnInit() {
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }


  onEditClick(){
    this.stu$.take(1)
      .subscribe(stu=>{
        const dialogRef=this.dialog.open( 
          NewStudentComponent,
          {data:{student:stu}});
      dialogRef.afterClosed().filter(n=>n).take(1)
          .subscribe(val=>{
          this.store$.dispatch(new actions.UpdateAction({
            ...stu,
            Province:val.Address.province,
            City:val.Address.city,
            District:val.Address.district,
            WorkPlace:val.Address.street,
            Name:val.Name,
            IdCardNO:val.IdCardNO,
            Grade:val.Grade,
            SchoolID:val.SchoolID,
            Major:val.Major,
            ClassName:val.ClassName,
            QQ:val.QQ,
            MobilePhoneNO:val.MobilePhoneNO,
            Nation:val.Nation,
            Schedule:val.Schedule,
            Education:val.Education
          }));
          })
      })
    
  }
 
  onUploadImageClick(){
    this.stu$.take(1)
    .subscribe(stu=>{
      const dialogRef=this.dialog.open( 
        UploadImgComponent,
        {data:{student:stu,type:'fyimg'}});
    // dialogRef.afterClosed().filter(n=>n).take(1)
    //     .subscribe(val=>{
    //     this.store$.dispatch(new dipActions.AddUserDiplomaAction({
    //        DiplomaID:val.DiplomaID,
    //        StudentID:stu.StudentID,
    //        CreateTime:val.CreateTime
    //     }));
    //     })
    })
   
  }
  onUploadCardClick(){
    this.stu$.take(1)
    .subscribe(stu=>{
      const dialogRef=this.dialog.open( 
        UploadImgComponent,
        {data:{student:stu,type:'fycard'}});
    // dialogRef.afterClosed().filter(n=>n).take(1)
    //     .subscribe(val=>{
    //     this.store$.dispatch(new dipActions.AddUserDiplomaAction({
    //        DiplomaID:val.DiplomaID,
    //        StudentID:stu.StudentID,
    //        CreateTime:val.CreateTime
    //     }));
    //     })
    })
   
  }
  //增加证书
  onAddCertificateClick(){
    this.stu$.take(1)
    .subscribe(stu=>{
      const dialogRef=this.dialog.open( 
        AddCertificateComponent,
        {data:{}});
    dialogRef.afterClosed().filter(n=>n).take(1)
        .subscribe(val=>{
        this.store$.dispatch(new dipActions.AddUserDiplomaAction({
           DiplomaID:val.DiplomaID,
           StudentID:stu.Id,
           CreateTime:val.CreateTime
        }));
        })
    })
  }
//编辑证书
  onEditDiplomaClick(diploma){
    const dialogRef=this.dialog.open( 
      AddCertificateComponent,
      {data:{userDiploma:diploma}
    });
    dialogRef.afterClosed().filter(n=>n).take(1)
      .subscribe(val=>{
        this.store$.dispatch(new dipActions.UpdateUserDiplomaAction({
          DiplomaID:val.DiplomaID,
          StudentID:diploma.StudentID,
          CreateTime:val.CreateTime,
          Id:diploma.Id
        })
      )}
    );
      
  }
  selectStudent(student:Student){
    this.store$.dispatch(new actions.SelectAction(student));
  }
}
