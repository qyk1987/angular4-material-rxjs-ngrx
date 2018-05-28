import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService}from '../services'

import { DiplomaListComponent } from './diploma-list/diploma-list.component';
const routes: Routes = [

    { path: 'diploma', component: DiplomaListComponent,canActivate:[AuthGuardService]},
    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
   providers:[AuthGuardService]
})
export class DiplomaRoutingModule {}
