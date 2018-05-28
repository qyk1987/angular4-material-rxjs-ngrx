
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { District, Campus } from '../../domain';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-new-spot',
  templateUrl: './new-spot.component.html',
  styleUrls: ['./new-spot.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewSpotComponent implements OnInit {
  title="";
  form:FormGroup;


  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewSpotComponent>,
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
  ) { 
   
  }

  ngOnInit() {
    if(this.data.spot){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
       
        SpotName:[this.data.spot.SpotName,Validators.required],
        SpotAddress:[this.data.spot.SpotAddress,Validators.required],
        SpotState:[this.data.spot.SpotState,Validators.required],
      });
      this.title="编辑服务点";
    }else{
      this.form=this.fb.group({
        
        SpotName:["",Validators.required],
        SpotAddress:["",Validators.required],
      });
      this.title="新增服务点";
    } 
    
    
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
