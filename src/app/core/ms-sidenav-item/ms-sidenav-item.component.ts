import { Component, OnInit ,Input,EventEmitter,Output,HostBinding,HostListener,ChangeDetectionStrategy} from '@angular/core';
import {cardAnimate} from '../../animates/card.animate'

@Component({
  selector: 'ms-sidenav-item',
  templateUrl: './ms-sidenav-item.component.html',
  styleUrls: ['./ms-sidenav-item.component.scss'],
  animations:[
    cardAnimate
  ]
})
export class MsSidenavItemComponent implements OnInit {
  @Input() item;
  @Output() itemClick=new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  onItemClcik(){
    this.itemClick.emit();
  }
}
