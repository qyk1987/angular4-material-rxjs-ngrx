import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService}from '../services'
import { ReportComponent } from './report/report.component';
const routes: Routes = [
    { path: 'report', component: ReportComponent,canActivate:[AuthGuardService] },
    // { path: 'squreAccounts', component: SquareAccountsComponent },
    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class ReportRoutingModule {}
