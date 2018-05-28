import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-school',
  templateUrl: './new-school.component.html',
  styleUrls: ['./new-school.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewSchoolComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewSchoolComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.school){//对表单进行初始化
     
      this.form=this.fb.group({
        SchoolName:[this.data.school.SchoolName,Validators.required],
        
      });
      this.title="编辑学校";
    }else{
      this.form=this.fb.group({
        SchoolName:["",Validators.required],
        
      });
      this.title="新增学校";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
