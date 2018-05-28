import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckAccountComponent} from './check-account/check-account.component';
import {AuthGuardService}from '../services'
const routes: Routes = [
    { path: 'check', component: CheckAccountComponent,canActivate:[AuthGuardService] },
    // { path: 'squreAccounts', component: SquareAccountsComponent },
    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class AccountRoutingModule {}
