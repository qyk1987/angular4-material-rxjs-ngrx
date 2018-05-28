import { Component, OnInit,Inject } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  form: FormGroup;
  title:string;
  value:number;
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<FeeComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    if (this.data.pay) {//对表单进行初始化
 
      this.form = this.fb.group({
        Value: [this.data.pay.value, [Validators.max(this.data.pay.value)]],
       
      });
      this.title = "向"+this.data.pay.studentName+this.data.pay.name+"收款";
    }
  }

  onSubmit({ value, valid }, ev: Event) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
