import { Component, OnInit, ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
 @Output() toggle=new EventEmitter<void>();
 @Output() selectRole=new EventEmitter<void>();
 @Output() toggleDarkTheme=new EventEmitter<boolean>();
 @Output() logout=new EventEmitter<void>();
 isLogin:boolean;
  constructor(
    private store$:Store<fromRoot.State>
  ) {
    this.store$.select(fromRoot.getAuth).subscribe(auth=>this.isLogin=auth.isLogin);
  }

  ngOnInit() {
  }
  openSidebar(){
      this.toggle.emit();
  }
  onChange(checked:boolean){
    this.toggleDarkTheme.emit(checked);
  }
  changeRole(){
    this.selectRole.emit();
  }
  onLogout(){
    this.logout.emit();
  }
}
