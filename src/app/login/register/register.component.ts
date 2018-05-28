import { Component, OnInit,HostBinding } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { routerAnimate } from '../../animates/router.animate';
import {Store} from '@ngrx/store';
import * as authActions from '../../actions/auth.action';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class RegisterComponent implements OnInit {
  @HostBinding('@router') state;
  form:FormGroup;
  items:string[];
  private readonly avatarName='avatar';

  constructor(private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
  
  ) { 
    
  }

  ngOnInit() {
    // const img=`${this.avatarName}:svg-${Math.floor(Math.random()*16).toFixed(0)}`;
    // const nums=[1,2,3,4,5,6,7,8,9,10,1,12,13,14,15,16];
    // this.items=nums.map(d=>`avatar:svg-${d}`);
    
      this.form=this.fb.group({
        Email:['',Validators.email],
        Name:['',Validators.required],
        pwd:this.fb.group({
          Password:['',this.pwdValidator],
          repeat:[],
        },{validator:this.equalValidator})
        
      });
   
    
  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.store$.select(fromRoot.getAuth).take(1)
    .subscribe(auth=>{
      const data={
        Name:value.Name,
        Email:value.Email,
        PhoneNumber:auth.userName,
        Password:value.pwd.Password,
        Img:"",
        UserName:auth.userName
      }
      console.log(data);
      this.store$.dispatch(new authActions.RegisterAction(data));
    })
   
  }

  equalValidator(group:FormGroup):any{
    let password:FormControl=group.get('Password') as FormControl;
    let repeat:FormControl=group.get('repeat') as FormControl;
    let valid=password.value===repeat.value;
    return valid?null:{equal:true};
   }
   pwdValidator(control:FormControl):any{
    var myreg=/^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
    let valid=myreg.test(control.value);
    return valid?null:{pwd:true};
   }
}
