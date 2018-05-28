import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { Observable } from 'rxjs/Observable';
import { CanAddStudent } from '../../vm/class.vm';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  title="";
  selectedStu:CanAddStudent[]=null;
  setting={
    columns:[
      {filed:'StudentName',title:'姓名'},
      {filed:'SchoolName',title:'学校',sort:"asc"},
      {filed:'OrderDate',title:'下单日期',format:"date"}
    ],
    class:[true,true,true,false],
    hasCheckBox:true
  }
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<AddStudentComponent>,
    private cd:ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.title="添加学生";
  }
  handleSelect(items){
    this.selectedStu=items;
  }
  dueAdd(){
    this.dialogRef.close(this.selectedStu);
  }

}
