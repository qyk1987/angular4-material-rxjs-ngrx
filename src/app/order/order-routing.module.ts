import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {SquareAccountsComponent} from './square-accounts/square-accounts.component';
import {DataAnalyseComponent} from './data-analyse/data-analyse.component';
import {OrderListComponent} from './order-list/order-list.component';
import {AuthGuardService}from '../services'

const routes: Routes = [
    { path: 'productList', component: ProductListComponent,canActivate:[AuthGuardService] },
    { path: 'squreAccounts', component: SquareAccountsComponent,canActivate:[AuthGuardService]},
    { path: 'dataAnalyse', component: DataAnalyseComponent,canActivate:[AuthGuardService] },
    { path: 'orderlist', component: OrderListComponent,canActivate:[AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class OrderRoutingModule {}
