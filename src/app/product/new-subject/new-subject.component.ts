
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewSubjectComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewSubjectComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.subject){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
        Name:[this.data.subject.Name,Validators.required],
        State:[this.data.subject.State,Validators.required],
      });
      this.title="编辑科目";
    }else{
      this.form=this.fb.group({
        Name:["",Validators.required],
      });
      this.title="新增科目";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
