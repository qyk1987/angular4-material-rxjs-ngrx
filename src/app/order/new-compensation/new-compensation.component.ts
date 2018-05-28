import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { School,Address } from '../../domain';
import { isNumber } from 'util';
@Component({
  selector: 'app-new-compensation',
  templateUrl: './new-compensation.component.html',
  styleUrls: ['./new-compensation.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewCompensationComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewCompensationComponent>,
    private fb:FormBuilder,
    @Inject('BASE_DATA') public baseData,
    private cd:ChangeDetectorRef
  ) {

   }

  ngOnInit() {
    
    if(this.data.compensation){//对表单进行初始化
      const max=this.data.debt;
      this.form=this.fb.group({
        Value:[this.data.compensation.Value, [Validators.max(max),Validators.required,Validators.min(0)]],
        Channel:[this.data.compensation.Channel,Validators.required],
      });
      this.title="编辑补费";
    }else{
      const max=this.data.debt;
      this.form=this.fb.group({
        Value:['',[Validators.max(max),Validators.required,Validators.min(0)]],
        Channel:['',Validators.required],
      });
      this.title="新增补费";
    }  
    
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }
  // validateValue(c:FormControl):{[key:string]:any}{
  //   const val=c.value;
  //   console.log(this.max,1);
  //   if(val>this.max){
  //     return {maxInvalid:true};
  //   }
  //   if(val<0){
  //     return {minInvalid:true};
  //   }
  //   if(!isNumber(val)){
  //     return {numberInvalid:true};
  //   }
  //   return null;
  // }
}
