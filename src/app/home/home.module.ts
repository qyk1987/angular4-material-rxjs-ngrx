import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import {HomeRoutingModule} from './home-routing.module'
 @NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
