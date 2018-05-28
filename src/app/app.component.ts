import { Component, } from '@angular/core';
import { OverlayContainer } from "@angular/material";
import {MdDialog} from '@angular/material';
import {ChangeRoleComponent} from './core/change-role/change-role.component';
import * as fromRoot from './reducers';
import {Store} from '@ngrx/store';
import * as actions from  './actions/auth.action';

export interface menuitem{
  id: number;
  isopen: boolean;
  icon: {
      issvg: boolean;
      icon: string;
  };
  name: string;
  lists: {
      name: string;
      link: string;
  }[];
  roleids: number[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  squareState:string;
  darkTheme=false;
  menuitems;
  switchTheme(dark){
    this.darkTheme=dark;
    this.oc.themeClass=dark?"myapp-dark-theme":null;
  }

  constructor(
    private oc:OverlayContainer,
    private dialog:MdDialog,
    private store$:Store<fromRoot.State>,
  ){

    this.store$.select(fromRoot.getmenuitems)
    .subscribe(menu=>{
        this.menuitems=JSON.parse(JSON.stringify(menu));
    });
     
  }
  launchNavClick(id){
     //console.log(id);
      for(var item of this.menuitems){
        if(item.id===id){
          item.isopen=!item.isopen;
        }else{
          item.isopen=false;
        }
      }
      //console.log(this.menuitems);
  }
  launchSelectRole(){
    const dialogRef=this.dialog.open( 
      ChangeRoleComponent,
      {data:{}});
    //dialogRef.afterClosed().filter(n=>n).take(1)
    
  }
  handleLogout(){
    this.store$.dispatch(new actions.LogoutAction(null));
  }
}
