
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.component.html',
  styleUrls: ['./new-coupon.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewCouponComponent implements OnInit {
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewCouponComponent>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    if(this.data.coupon){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
        CouponName:[this.data.coupon.CouponName,Validators.required],
        Vlaue:[this.data.coupon.Vlaue,Validators.required],
        Rule:[this.data.coupon.Rule,Validators.required],
        OverDate:[this.data.coupon.OverDate,Validators.required],
        
        State:[this.data.coupon.State,Validators.required],
      });
      this.title="编辑优惠券";
    }else{
      this.form=this.fb.group({
        CouponName:[,Validators.required],
        Vlaue:[,Validators.required],
        Rule:[,Validators.required],
        OverDate:[new Date(),Validators.required],
       
      });
      this.title="新增优惠券";
    }   
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
