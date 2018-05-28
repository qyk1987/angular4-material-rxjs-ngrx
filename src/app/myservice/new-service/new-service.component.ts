import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewServiceComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewServiceComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.service){//对表单进行初始化
     
      this.form=this.fb.group({
        ServiceName:[this.data.service.ServiceName,Validators.required],
        State:[this.data.service.State,Validators.required],
      });
      this.title="编辑服务";
    }else{
      this.form=this.fb.group({
        ServiceName:["",Validators.required],
      });
      this.title="新增服务";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
