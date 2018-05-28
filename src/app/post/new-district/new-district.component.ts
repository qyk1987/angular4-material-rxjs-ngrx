
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-district',
  templateUrl: './new-district.component.html',
  styleUrls: ['./new-district.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewDistrictComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewDistrictComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.district){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
        DistrictName:[this.data.district.DistrictName,Validators.required],
        DistrictAddress:[this.data.district.DistrictAddress,Validators.required],
        DistrictState:[this.data.district.DistrictState,Validators.required],
      });
      this.title="编辑大区";
    }else{
      this.form=this.fb.group({
        DistrictName:["",Validators.required],
        DistrictAddress:["",Validators.required],
      });
      this.title="新增大区";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
