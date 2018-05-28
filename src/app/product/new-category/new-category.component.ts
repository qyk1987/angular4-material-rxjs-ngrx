
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewCategoryComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.category){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
        CategoryName:[this.data.category.CategoryName,Validators.required],
       
        State:[this.data.category.State,Validators.required],
      });
      this.title="编辑类别";
    }else{
      this.form=this.fb.group({
        CategoryName:["",Validators.required],
       
      });
      this.title="新增类别";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
