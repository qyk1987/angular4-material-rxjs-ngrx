import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyResetComponent } from './verify-reset/verify-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify', component: VerifyComponent },
    { path: 'forget', component: VerifyResetComponent },
    { path: 'reset', component: ResetPasswordComponent },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
