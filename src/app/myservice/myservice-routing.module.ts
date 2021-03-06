import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService}from '../services'
import { ServiceComponent } from './service/service.component';

const routes: Routes = [

    { path: 'service', component: ServiceComponent,canActivate:[AuthGuardService] },

    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class MyserviceRoutingModule {}
