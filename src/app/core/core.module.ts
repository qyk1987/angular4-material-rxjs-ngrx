import { NgModule, SkipSelf,Optional } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import {HttpModule} from '@angular/http'
import {AppEffectsModule} from '../effects';
import {loadSvgResources}from '../utils/svg.util';
import {ShareModule} from '../share/share.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
import {AppStoreModule} from '../reducers';
import { FileUploadModule } from 'ng2-file-upload';
import 'hammerjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/withLatestFrom';

import { ServicesModule } from '../services';
import '../utils/debug.util';
import { MsSidenavItemComponent } from './ms-sidenav-item/ms-sidenav-item.component';
import { ChangeRoleComponent } from './change-role/change-role.component';

@NgModule({
  imports: [
    HttpModule,
    ShareModule,
    FileUploadModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppEffectsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    MsSidenavItemComponent, 
    ChangeRoleComponent,
    
  ],
  entryComponents:[
    ChangeRoleComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule],
  providers:[
    {
      provide:'BASE_CONFIG',useValue:{
      uri:'http://localhost:3000'
      }
    },
    {
      provide:'BASE_ASPNET_API_CONFIG',useValue:{
      uri:'http://fyapi.xueqitian.com/api'//'http://localhost:49238/api'//
      }
    },
    {
      provide:'BASE_ASPNET_MVC_CONFIG',useValue:{
      uri:'http://fyapi.xueqitian.com'//'http://localhost:49238'//
      }
    },
    {
      provide:"BASE_DATA",useValue:{
        major:[
          {id:0,name:"经济类" },{id:1,name:"工科类" },{id:2,name:"管理类" },{id:3,name:"理科类" },{id:4,name:"教育类" },{id:5,name:"医学类" }         
        ],
        education:[
          {id:0,name:"高中" },{id:1,name:"专科" },{id:2,name:"本科" },{id:3,name:"研究生" },{id:4,name:"博士" }        
        ],
        nation:[
          {id:0,name:"汉族"},{id:1,name:"蒙古族"},{id:2,name:"回族"},{id:3,name:"藏族"},{id:4,name:"维吾尔族"}
        ],
        grade:[
          {id:"2013",name:"2013级" },{id:"2014",name:"2014级" },{id:"2015",name:"2015级" },{id:"2016",name:"2016级" },{id:"2017",name:"2017级" },{id:"2018",name:"2018级" }         
        ],
        classState:[
          {id:0,name:"待开课" },{id:1,name:"已开课" },{id:2,name:"已结束" }        
        ],
        channel:[
          {id:0,name:"支付宝",src:"http://image.xueqitian.com/assets/icon/payicon/alipay_72px_1186722_easyicon.net.png" },
          {id:1,name:"微信",src:"http://image.xueqitian.com/assets/icon/payicon/Wechat_72px_1127960_easyicon.net.png" },
          {id:2,name:"现金",src:"http://image.xueqitian.com/assets/icon/payicon/cash_72px_1187368_easyicon.net.png" },
          {id:3,name:"银行卡",src:"http://image.xueqitian.com/assets/icon/payicon/generic_bank_Credit_Card_72px_559160_easyicon.net.png" },
          {id:4,name:"信用卡",src:"http://image.xueqitian.com/assets/icon/payicon/visa_Credit_Card_72px_559165_easyicon.net.png" },
          {id:5,name:"农商服务部二维码",src:"http://image.xueqitian.com/assets/icon/payicon/qr_code_72px_1168875_easyicon.net.png" },
          {id:6,name:"其他",src:"http://image.xueqitian.com/assets/icon/payicon/qr_code_72px_1168875_easyicon.net.png" }        
        ],
        imgPath:"http://p1szdp1zg.bkt.clouddn.com/fyimg/",
        defaultImg:"http://p1szdp1zg.bkt.clouddn.com/fyimg/default.jpg"
      }
    }
    
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent:CoreModule,ir:MdIconRegistry,ds:DomSanitizer){
    if(parent){
      throw new Error('coreModule is already exsit!')
    }
    loadSvgResources(ir,ds);
    
  }
}
