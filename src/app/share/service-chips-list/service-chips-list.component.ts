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
import {Service} from '../../domain/index';
import { ServiceService } from '../../services/service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-service-chips-list',
  templateUrl: './service-chips-list.component.html',
  styleUrls: ['./service-chips-list.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ServiceChipsListComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ServiceChipsListComponent),
      multi:true
    }
    
  ]
})
export class ServiceChipsListComponent implements ControlValueAccessor,OnInit {

  @Input() multiple=true;
  @Input() placeholderText="请输入学生";
  @Input() label="添加/修改数据";
  chips:FormGroup;
  items:Service[]=[];
  memberResults$:Observable<Service[]>;
  constructor(private fb:FormBuilder,private store$:Store<fromRoot.State>) { }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    this.chips=this.fb.group({
      memberSelect:['']
    });
    this.memberResults$=this.store$.select(fromRoot.getServices);
    this.chips.get('memberSelect').valueChanges
    .debounceTime(300)
    .subscribe(member=> {
      if(this.items.map(item=>item.Id).indexOf(member.Id)!==-1){
        return;
      }
      this.items=this.multiple?[...this.items,member]:[member];
      this.propagateChange(this.items);
      return null;
    });
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
  removeMember(member:Service){
    const ids=this.items.map(item=>item.Id);
    const i=ids.indexOf(member.Id);
    if(this.multiple){
      this.items=[...this.items.slice(0,i),...this.items.slice(i+1)];
    }else {
      this.items=[];
    }
    this.propagateChange(this.items);
  }

  get displayInput(){
    return this.multiple||this.items.length===0;
  }

}
