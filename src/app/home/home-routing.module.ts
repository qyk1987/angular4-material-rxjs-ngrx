import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuardService}from '../services'

const routes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuardService] },
  
    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class HomeRoutingModule {}
