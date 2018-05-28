import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Diploma } from '../../domain';
@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddCertificateComponent implements OnInit {
  form:FormGroup;
  title="";
  diplomas$:Observable<Diploma[]>;
  constructor(@Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<AddCertificateComponent>,
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
    private cd:ChangeDetectorRef
  ) { 

  }
 

  ngOnInit() {
   this.diplomas$=this.store$.select(fromRoot.getDiplomas);
   if(this.data.userDiploma){//对表单进行初始化
    this.form=this.fb.group({
      DiplomaID:[this.data.userDiploma.DiplomaID,Validators.required],
      CreateTime:[this.data.userDiploma.CreateTime,Validators.required],
     
    });
    this.title="编辑证书";
  }else{
    this.form=this.fb.group({
      DiplomaID:[1,Validators.required],
      CreateTime:["",Validators.required],
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
