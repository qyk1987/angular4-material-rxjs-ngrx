import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService}from '../services'

import { SpotListComponent } from './spot-list/spot-list.component';

const routes: Routes = [

    { path: 'organization', component: SpotListComponent,canActivate:[AuthGuardService] },

    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class PostRoutingModule {}
