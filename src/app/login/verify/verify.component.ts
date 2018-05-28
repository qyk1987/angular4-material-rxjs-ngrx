import { Component, OnInit,OnDestroy,HostBinding } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { routerAnimate } from '../../animates/router.animate';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as authActions from '../../actions/auth.action';
import * as fromRoot from '../../reducers';
import { AuthService } from '../../services/auth.service';
import { ImgCode } from '../../vm/imgcode.vm';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class VerifyComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  code:ImgCode;
  form:FormGroup;
  canSend:boolean=false;
  sub:Subscription;
  iserror:boolean=false;
  error:string="";
  issend:boolean=false;
  time:number=90;
  btnText:string="发送短信验证码";
  constructor(
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
    private service$:AuthService 
  ) { 
    this.newCode();
    this.sub=this.store$.select(fromRoot.getAuth)
    .subscribe(auth=>{
      if(auth.userName!==null&&auth.userName.length==11&&this.form.get("SmsCode").disabled){
        this.form.get("SmsCode").enable();
        
      }
      if(auth.error){
        this.iserror=true;
        this.error=auth.text;
      }else{
        this.iserror=false;
        this.error="";
      }
      if(!this.issend&&auth.issend){
        this.form.get("SmsCode").markAsTouched();
        this.issend=true;
        let timer = Observable.timer(1000,1000).take(92);
        timer.subscribe(val=>{
          this.time=92-val;
          //console.log(this.time);
          this.btnText="短信已发送("+this.time+"S后可重发)";
          if(this.time===1){
            this.store$.dispatch(new authActions.CancelSendAction(null));
          }
        })
        //.last()
        //.subscribe(val=>this.store$.dispatch(new authActions.CancelSendAction(null)));
      
      }else if(this.issend&&!auth.issend){
        this.issend=false;
        this.btnText="重发短信验证码";
      }
    })
  }

  ngOnInit() {
    this.form=this.fb.group({ 
      PhoneNumber:['',[this.mobileValidator]],
      Code:['',Validators.required],
      SmsCode:[{value: '', disabled: true},Validators.required],
    });
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  newCode(){
    this.service$.getImgCode().take(1)
    .subscribe(img=>{
      this.code=img;
    });
  }

  sendCode(){
    const number=this.form.get('PhoneNumber');
    const code=this.form.get('Code');
    const data={
      PhoneNumber:number.value,
      Key:this.code.key,
      Code:code.value,
      type:"register"
    }
    this.store$.dispatch(new authActions.VerifyImgAction(data));

  }

  onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    const number=this.form.get('PhoneNumber');
    const data={
      PhoneNumber:value.PhoneNumber,
      SmsCode:value.SmsCode,
      type:"register"
    }
    //console.log(value)
    this.store$.dispatch(new authActions.VerifyAction(data));
  }

  

  mobileValidator(control:FormControl):any{
   var myreg=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
   let valid=myreg.test(control.value);
   return valid?null:{mobile:true};
  }

}
