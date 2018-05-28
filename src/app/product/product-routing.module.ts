import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService}from '../services'

import { ProductAdminComponent } from './product-admin/product-admin.component';

const routes: Routes = [

    { path: 'productadmin', component: ProductAdminComponent,canActivate:[AuthGuardService] },

    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[AuthGuardService]
})
export class ProductRoutingModule {}
