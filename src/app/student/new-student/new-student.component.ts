import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { School, Address } from '../../domain';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStudentComponent implements OnInit {
  title = "";
  items: string[];
  schools$: Observable<School[]>;
  form: FormGroup;
  nations = this.baseData.nation;
  grades = this.baseData.grade;
  educations = this.baseData.education;
  majors = this.baseData.major;
  avatarName = 'avatar';
  constructor(@Inject(MD_DIALOG_DATA) public data,
    private dialogRef: MdDialogRef<NewStudentComponent>,
    private fb: FormBuilder,
    @Inject('BASE_DATA') private baseData,
    private store$: Store<fromRoot.State>,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.schools$ = this.store$.select(fromRoot.getSchools);
    if (this.data.student) {//对表单进行初始化
      const address = {
        province: this.data.student.Province,
        city: this.data.student.City,
        district: this.data.student.District,
        street: this.data.student.WorkPlace
      }
      this.form = this.fb.group({
        Name: [this.data.student.Name, Validators.required],
        IdCardNO: [this.data.student.IdCardNO, this.idCardValidator],
        Grade: [this.data.student.Grade],
        Major: [this.data.student.Major],
        SchoolID: [this.data.student.SchoolID],
        QQ: [this.data.student.QQ],
        ClassName: [this.data.student.ClassName],
        MobilePhoneNO: [this.data.student.MobilePhoneNO, this.mobileValidator],
        Address: [address],
        Nation: [this.data.student.Nation],
        Schedule: [this.data.student.Schedule],
        Education: [this.data.student.Education]
      });
      this.title = "编辑学生";
    } else {
      this.form = this.fb.group({
        Name: ["", Validators.required],
        IdCardNO: ["", this.idCardValidator],
        Grade: [this.grades[3].id],
        Major: [this.majors[0].id],
        SchoolID: [1],
        QQ: [],
        ClassName: [],
        MobilePhoneNO: ["", this.mobileValidator],
        Address: [],
        Nation: [this.nations[0].id],
        Schedule: ["000000000000000000000"],
        Education: [this.educations[2].id]
      });
      this.title = "新增学生";
    }
  }
  mobileValidator(control: FormControl): any {
    var myreg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    let valid = myreg.test(control.value);
    return valid ? null : { mobile: true };
  }
  idCardValidator(control: FormControl): any {

    if (control.value.length > 0) {
      var myreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      let valid = myreg.test(control.value);
      return valid ? null : { card: true };
    } else {
      return null;
    }
  }


  onSubmit({ value, valid }, ev: Event) {
    if (!valid) {
      return;
    }
    if (value.Address === null) {
      value.Address = {
        province: "",
        city: "",
        district: "",
        street: ""
      }
    }
    this.dialogRef.close(value);
  }
}
