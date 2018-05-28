import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Class} from '../../domain';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import{ClassService}from '../../services'
import { ChargerVM } from '../../vm/class.vm';
@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewClassComponent implements OnInit {


  title="";
  form:FormGroup;
  chargers$:Observable<ChargerVM[]>;
  cid;
  constructor( 
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewClassComponent>,
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
    private cd:ChangeDetectorRef,
    private services$:ClassService,
    @Inject('BASE_DATA') public baseData,
  ) {
    this.store$.select(fromRoot.getSelectedPost).take(1)
    .subscribe(duty=>{
      this.chargers$=this.services$.getChargers(duty.CampusId);
      this.chargers$.take(1).subscribe(c=>this.cid=c[0].Id)
    });
   }

  ngOnInit() {
    if(this.data.classdata){//对表单进行初始化
      this.form=this.fb.group({
        ClassName:[this.data.classdata.ClassName,Validators.required],
        products:[this.data.classdata.products,Validators.required],
        ChargerID:[this.data.classdata.ChargerID,Validators.required],
        Arrange:[this.data.classdata.Arrange],
        OverDate:[this.data.classdata.OverDate],
        ClassState:[this.data.classdata.ClassState,Validators.required],
      });
      this.title="编辑班级";
    }else{
      this.form=this.fb.group({
        ClassName:['',Validators.required],
        products:[[],Validators.required],
        ChargerID:[this.cid,Validators.required],
        Arrange:[],
        OverDate:[new Date()],
        ClassState:[0,Validators.required],
      });
      this.title="新增班级";
    }   
  }
  endFilter = (d: Date|null): boolean => {
    //console.log(this._data.endDate);
    
    //this.form.get('OverDate').errors
    return d===null?true:d>=new Date();
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
   
    this.dialogRef.close(value);
  }

}
