import { Component, OnInit ,ChangeDetectionStrategy,HostBinding} from '@angular/core';
import {FormBuilder, FormGroup,FormControl,Validators}from '@angular/forms';
import { routerAnimate } from '../../animates/router.animate';
import {Quote} from '../../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';
import { Auth } from '../../domain';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class LoginComponent implements OnInit {
  @HostBinding('@router') state;
  quote$:Observable<Quote>;
  auth$:Observable<Auth>;
  form:FormGroup;
  token:string;
  visible=false;
  inputType='password';
  constructor(private fb:FormBuilder,
    private store$:Store<fromRoot.State>) { 
    this.store$.dispatch(new authActions.LogoutSuccessAction(null));
   // this.store$.select(fromRoot.getAuth)
     // .subscribe(auth=>this.auth=auth);
  }

  ngOnInit() {
    this.quote$=this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new actions.LoadAction(null));
    //this.store$.dispatch(new authActions.GetTokenAction(null));
    this.auth$=this.store$.select(fromRoot.getAuth);
    this.form=this.fb.group({
      email:['',Validators.compose([Validators.required])],
      password:["",Validators.required]
    });
  }
  onSubmit({value,valid},ev:Event){
    ev.preventDefault();
    if(!valid){
      return  ;
    }
    //svalue.token=this.token;
    //console.log(value);
    this.store$.dispatch(new authActions.LoginAction(value))
  }
  show(){
    this.visible=true;
    this.inputType='text';
  }
  hide(){
    this.visible=false;
    this.inputType='password';
  }
}
