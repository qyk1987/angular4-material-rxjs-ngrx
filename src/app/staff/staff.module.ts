import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import {StaffRoutingModule} from './staff-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    StaffRoutingModule
  ],
  declarations: [UserListComponent, UserDetailComponent]
})
export class StaffModule { }
