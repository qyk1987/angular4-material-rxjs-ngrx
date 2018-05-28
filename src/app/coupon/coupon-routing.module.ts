import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import {AuthGuardService}from '../services'
const routes: Routes = [
    { path: 'coupon', component: CouponListComponent,canActivate:[AuthGuardService] },
    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class CouponRoutingModule {}
