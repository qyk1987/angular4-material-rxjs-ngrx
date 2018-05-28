import { Component, OnInit,Input,forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {User} from '../../domain/index';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ChipsListComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ChipsListComponent),
      multi:true
    }
    
  ]
})
export class ChipsListComponent implements ControlValueAccessor,OnInit {

  @Input() multiple=true;
  @Input() placeholderText="请输入成员";
  @Input() label="添加/修改数据";
  chips:FormGroup;
  items:User[]=[];
  memberResults$:Observable<User[]>;
  constructor(private fb:FormBuilder,private service$:UserService) { }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    this.chips=this.fb.group({
      memberSearch:['']
    });
    this.memberResults$=this.chips.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s=>s&&s.length>=2)
      .switchMap(str=>this.service$.searchUsers(str));
  }

  
  writeValue(obj: any): void{
   if(obj&&this.multiple){
    const userEntities=obj.reduce((e,c)=>({...e,c}),{});
    if(this.items){
      const remaining=this.items.filter(item=>!userEntities[item.Id]);
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

  removeMember(member:User){
    const ids=this.items.map(item=>item.Id);
    const i=ids.indexOf(member.Id);
    if(this.multiple){
      this.items=[...this.items.slice(0,i),...this.items.slice(i+1)];
    }else {
      this.items=[];
    }
    this.chips.patchValue({memberSearch:''});
    this.propagateChange(this.items);
  }

  handleMemberSelection(member:User){
    if(this.items.map(item=>item.Id).indexOf(member.Id)!==-1){
      return;
    }
    this.items=this.multiple?[...this.items,member]:[member];
    this.chips.patchValue({memberSearch:member.UserName});
    this.propagateChange(this.items);
  }

  displayUser(user:User):string{
    return user?user.UserName:'';
  }

  get displayInput(){
    return this.multiple||this.items.length===0;
  }
}
