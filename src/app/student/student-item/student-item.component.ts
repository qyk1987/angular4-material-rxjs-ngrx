import { Component, OnInit ,Input,EventEmitter,Output,HostBinding,HostListener,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {cardAnimate} from '../../animates/card.animate';
@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss'],
  animations:[
    cardAnimate
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class StudentItemComponent implements OnInit {
  @Input() item;
  @Output() inDetail=new EventEmitter<void>();

  @HostBinding('@card') cardState='out';
  constructor(

  ) { }

  ngOnInit() {

  }
  @HostListener('mouseenter')
  onMouseEnter(){
      this.cardState='hover';
    }
  
  @HostListener('mouseleave')
  onMouseLeave(){
      this.cardState='out';
    }
  

  onClick(){
    this.inDetail.emit();
  }


}
