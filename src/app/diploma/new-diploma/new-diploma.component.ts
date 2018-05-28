import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-diploma',
  templateUrl: './new-diploma.component.html',
  styleUrls: ['./new-diploma.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewDiplomaComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewDiplomaComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.diploma){//对表单进行初始化
     
      this.form=this.fb.group({
        DiplomaName:[this.data.diploma.DiplomaName,Validators.required],
        DiplomaState:[this.data.diploma.DiplomaState,Validators.required],
      });
      this.title="编辑证书";
    }else{
      this.form=this.fb.group({
        DiplomaName:["",Validators.required],
        
      });
      this.title="新增证书";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
