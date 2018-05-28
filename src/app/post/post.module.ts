import { NgModule } from '@angular/core';
import {ShareModule} from '../share/share.module';
import { BrowserModule } from '@angular/platform-browser';

import {PostRoutingModule} from './post-routing.module';


import { NewDistrictComponent } from './new-district/new-district.component';
import { NewCampusComponent } from './new-campus/new-campus.component';
import { SpotListComponent } from './spot-list/spot-list.component';
import { NewSpotComponent } from './new-spot/new-spot.component';



import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    ShareModule,
    BrowserModule,
    PostRoutingModule
  ],
  declarations: [
   
 
    NewDistrictComponent, 
    NewCampusComponent, 
    SpotListComponent, 
    NewSpotComponent, 
    NewPostComponent, 
    PostDetailComponent
  ],
  entryComponents:[
    NewDistrictComponent,
    NewCampusComponent,
    NewSpotComponent,
    NewPostComponent,

  ]
})
export class PostModule { }
