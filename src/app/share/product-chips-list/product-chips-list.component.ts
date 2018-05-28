import { Component, OnInit,Input,forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../domain/index';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-chips-list',
  templateUrl: './product-chips-list.component.html',
  styleUrls: ['./product-chips-list.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ProductChipsListComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ProductChipsListComponent),
      multi:true
    }
    
  ]
})
export class ProductChipsListComponent implements ControlValueAccessor,OnInit {

  @Input() multiple=true;
  @Input() placeholderText="请选择产品";
  @Input() label="添加/修改数据";
  chips:FormGroup;
  items:Product[]=[];
  memberResults$:Observable<Product[]>;
  constructor(private fb:FormBuilder,private store$:Store<fromRoot.State>) { }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    const data$=this.store$.select(fromRoot.getProducts)
    this.chips=this.fb.group({
      memberSearch:['']
    });
    this.chips.get('memberSearch').valueChanges
      .distinctUntilChanged()
      .filter(s=>s&&s.length>=2)
      .subscribe(str=>this.memberResults$=data$.map(r=>r.filter(p=>p.ProductName.toLowerCase().indexOf(str.toLowerCase())>-1)));
    
  }
  writeValue(obj: any): void{
    if(obj&&this.multiple){
      const ids=obj.map(o=>o.Id);
     if(this.items){
       const remaining=this.items.filter(item=>!(ids.indexOf(item.Id)>-1));
       this.items=[...remaining,...obj];
     }
    }
    else if(obj&&!this.multiple){
     this.items=[...obj];
    }
   }
   registerOnChange(fn: any): void{
    this.propagateChange=fn;
  }
  registerOnTouched(fn: any): void{

  }
  validate(c:FormControl):{[key:string]:any}{
    return this.items?null:{
      chipListInvalid:true
    }
  }
  removeMember(member:Product){
    const ids=this.items.map(item=>item.Id);
    const i=ids.indexOf(member.Id);
    if(this.multiple){
      this.items=[...this.items.slice(0,i),...this.items.slice(i+1)];
    }else {
      this.items=[];
    }
    this.propagateChange(this.items);
  }

  handleMemberSelection(member:Product){
    if(this.items.map(item=>item.Id).indexOf(member.Id)!==-1){
      return;
    }

    this.items=this.multiple?[...this.items,member]:[member];
    this.chips.patchValue({memberSearch:member.ProductName});
    this.propagateChange(this.items);
  }

  get displayInput(){
    return this.multiple||this.items.length===0;
  }
  displayUser(user:Product):string{
    return user?user.ProductName:'';
  }
}
