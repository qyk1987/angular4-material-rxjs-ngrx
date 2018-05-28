import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module'
import { LoginComponent } from './login/login.component';
import {LoginRoutingModule} from './login-routing.module';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyResetComponent } from './verify-reset/verify-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
@NgModule({
  imports: [
    ShareModule,
    LoginRoutingModule
    
  ],
  declarations: [LoginComponent, RegisterComponent, VerifyComponent, VerifyResetComponent, ResetPasswordComponent]
})
export class LoginModule { }
