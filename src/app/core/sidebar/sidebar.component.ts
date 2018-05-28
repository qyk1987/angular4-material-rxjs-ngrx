import { Component, OnInit,Input, ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import {getDate} from 'date-fns'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  today='day';
  @Input() items;
  @Output() navClick=new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    this.today=`day${getDate(new Date())}`;
  }
  onNavClcik(id){
    this.navClick.emit(id);
  }
}
