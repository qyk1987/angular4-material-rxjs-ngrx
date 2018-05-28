import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClassListComponent}from './class-list/class-list.component';
import {AuthGuardService}from '../services'
import { ClassDetailComponent } from './class-detail/class-detail.component';
const routes: Routes = [
    { path: 'classlist', component: ClassListComponent,canActivate:[AuthGuardService]},
    { path: 'class/:id', component: ClassDetailComponent,canActivate:[AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class TeachRoutingModule {}
