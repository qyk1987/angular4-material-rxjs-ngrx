
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { District } from '../../domain';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-new-campus',
  templateUrl: './new-campus.component.html',
  styleUrls: ['./new-campus.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewCampusComponent implements OnInit {
  title="";
  form:FormGroup;
  district$:Observable<District[]>;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewCampusComponent>,
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
  ) { 
   
  }

  ngOnInit() {
    if(this.data.campus){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
       
        CampusName:[this.data.campus.CampusName,Validators.required],
        CampusAddress:[this.data.campus.CampusAddress,Validators.required],
        CampusState:[this.data.campus.CampusState,Validators.required],
      });
      this.title="编辑校区";
    }else{
      this.form=this.fb.group({
       
        CampusName:["",Validators.required],
        CampusAddress:["",Validators.required],
      });
      this.title="新增校区";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
