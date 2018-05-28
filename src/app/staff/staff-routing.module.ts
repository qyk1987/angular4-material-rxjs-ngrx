import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
//import { ServiceComponent } from './service/service.component';
const routes: Routes = [
    { path: 'user', component: UserListComponent },
    //{ path: 'service', component: ServiceComponent },
    // { path: 'squreAccounts', component: SquareAccountsComponent },
    // { path: 'dataAnalyse', component: DataAnalyseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule {}
