import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentListComponent}from './student-list/student-list.component';
import {StudentDetailComponent}from './student-detail/student-detail.component'
import {AuthGuardService}from '../services'

const routes: Routes = [
    { path: 'student', component: StudentListComponent,canActivate:[AuthGuardService]},
    { path: 'student/:id', component: StudentDetailComponent,canActivate:[AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class StudentRoutingModule {}
