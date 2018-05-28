import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SchoolComponent} from './school/school.component';
import {AuthGuardService}from '../services'

const routes: Routes = [
    { path: 'school', component: SchoolComponent,canActivate:[AuthGuardService] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class SchoolRoutingModule {}
