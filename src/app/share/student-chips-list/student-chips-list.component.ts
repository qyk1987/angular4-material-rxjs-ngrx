import { Component, OnInit,Input,forwardRef} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Student} from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as orderActions from '../../actions/order.action';
import * as srhActions from '../../actions/search.action';
import * as fromRoot from '../../reducers';
import {MdDialog} from '@angular/material';
import * as stuActions from  '../../actions/student.action' ;
import {NewStudentComponent} from '../../student/new-student/new-student.component';
@Component({
  selector: 'app-student-chips-list',
  templateUrl: './student-chips-list.component.html',
  styleUrls: ['./student-chips-list.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>StudentChipsListComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>StudentChipsListComponent),
      multi:true
    }
    
  ]
})
export class StudentChipsListComponent implements ControlValueAccessor, OnInit {

  @Input() multiple=true;
  @Input() placeholderText="请输入学生";
  @Input() label="添加学生：";
  @Input() isLoadOrder=false;
  @Input() isAddStudent=true;
  @Input() isRewrite=false;
  chips:FormGroup;
  items:Student[]=[];
  memberResults$:Observable<Student[]>;
  constructor(
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
    private dialog:MdDialog,
  ) { }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    this.chips=this.fb.group({
      memberSearch:['']
    });
    this.chips.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s=>s&&s.length>=2)
      .subscribe(str=>this.store$.dispatch(new srhActions.ChangeLikeKeyAction(str)));
    this.memberResults$=this.store$.select(fromRoot.getStudentsBySearchLike);
  }

  writeValue(obj: any): void{
    if(obj&&this.multiple){
     const ids=obj.map(o=>o.Id);
     //console.log(obj);
     if(this.items&&!this.isRewrite){
       const remaining=this.items.filter(item=>!(ids.indexOf(item.Id)>-1));
       this.items=[...remaining,...obj];
     }else{
      this.items=[...obj];
     }
     //console.log(this.items);
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
  removeMember(member:Student){
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

  handleMemberSelection(member:Student){
    if(this.items.map(item=>item.Id).indexOf(member.Id)!==-1){
      return;
    }
    if(this.isLoadOrder){//如果空间设置加载order才去加载order
      this.store$.dispatch(new orderActions.LoadByStudentAction(member.Id));
      
    }
    this.items=this.multiple?[...this.items,member]:[member];
    this.chips.patchValue({memberSearch:member.Name});
    this.propagateChange(this.items);
  }

  displayUser(user:Student):string{
    return user?user.Name+user.MobilePhoneNO:'';
  }

  get displayInput(){
    return this.multiple||this.items.length===0;
  }

  openNewStudentDialog(){
    const dialogRef=this.dialog.open( 
      NewStudentComponent,
      {data:{}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.select(fromRoot.getSelectedPost).take(1)
        .subscribe(duty=>{
          this.store$.dispatch(new stuActions.AddAction({...val,SignerId:duty.Id, Province:val.Address.province,City:val.Address.city,District:val.Address.district,WorkPlace:val.Address.street}));          
        })
//this.store$.dispatch(new stuActions.AddAction({...val, Province:val.Address.province,City:val.Address.city,District:val.Address.city,WorkPlace:val.Address.street}));
      }
    });
  }
}
