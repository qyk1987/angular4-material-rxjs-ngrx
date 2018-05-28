import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
const routes: Routes = [
    { path:'',redirectTo:'/login',pathMatch:'full' },
    //{ path:'student',redirectTo:'/student',pathMatch:'full',canActivate:[LoginGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
    exports: [RouterModule],
    //providers:[LoginGuard]
})
export class AppRoutingModule {}
