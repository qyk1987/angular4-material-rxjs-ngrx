import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';

import {ProductRoutingModule} from './product-routing.module';


import { ProductAdminComponent } from './product-admin/product-admin.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewSubjectComponent } from './new-subject/new-subject.component';
import { NewProductComponent } from './new-product/new-product.component';




@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    ProductRoutingModule
  ],
  declarations: [
    
    ProductAdminComponent, 
    NewCategoryComponent, 
    NewSubjectComponent, 
    NewProductComponent, 

  ],
  entryComponents:[
   
    NewCategoryComponent,
    NewSubjectComponent,
    NewProductComponent,

  ]
})
export class ProductModule { }

