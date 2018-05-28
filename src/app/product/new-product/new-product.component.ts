
import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewProductComponent implements OnInit {
  title="";
  form:FormGroup;
  isold:boolean=false;
  ispackage:boolean=false;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewProductComponent>,
    private fb:FormBuilder,
    private cd:ChangeDetectorRef,
  ) { }

  ngOnInit() {
    if(this.data.product){//对表单进行初始化
      //console.log(this.data);
      this.form=this.fb.group({
        ProductName:[this.data.product.ProductName,Validators.required],
        Desc:[this.data.product.Desc,Validators.required],
        Price:[this.data.product.Price,Validators.required],
        IsDiscountForOld:[this.data.product.IsDiscountForOld,Validators.required],
        DiscountValue:[this.data.product.DiscountValue],
        IsPackage:[this.data.product.IsPackage,Validators.required],
        products:[this.data.product.products],
        Coupons:[this.data.product.Coupons],
        Services:[this.data.product.Services],
        IsNeedCardNo:[this.data.product.IsNeedCardNo,Validators.required],
        State:[this.data.product.State,Validators.required],
        packageproducts:[this.data.product.packageproducts],
      });

      this.title="编辑产品";
    }else{
      this.form=this.fb.group({
        ProductName:["",Validators.required],
        Desc:["",Validators.required],
        Price:["",Validators.required],
        IsDiscountForOld:[false,Validators.required],
        IsNeedCardNo:[false,Validators.required],
        DiscountValue:[""],
        IsPackage:[false,Validators.required],
        packageproducts:[[]],
        products:[[]],
        Coupons:[[]],
        Services:[[]],
      });
      this.title="新增产品";
    } 
    
    const isold=this.form.get('IsDiscountForOld');
    const ispackage=this.form.get('IsPackage');
   

    isold.valueChanges
      .subscribe(d=>{
        this.isold=d;
        this.cd.markForCheck();

      })
   ispackage.valueChanges
      .subscribe(d=>{
        this.ispackage=d;
        
         this.cd.markForCheck();
      }) 
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }

}
