import { 
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Inject,
  Output } from '@angular/core';
import {cardAnimate} from '../../animates/card.animate';
@Component({
  selector: 'app-receipt-item',
  templateUrl: './receipt-item.component.html',
  styleUrls: ['./receipt-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardAnimate],
})
export class ReceiptItemComponent  {
  @Input() item;
  @Output() itemSelected = new EventEmitter<void>();
  @Output() dueAccount = new EventEmitter<void>();
  @Output() dueBack = new EventEmitter<void>();
  @Output() remindAccount = new EventEmitter<void>();

  @Output() promptCompensation = new EventEmitter<void>();
  @Output() dueCompensation = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  constructor(
    @Inject('BASE_DATA') public baseData,
  ) { }

  ngOnInit() {
  }
  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.cardState = 'out';
  }
  ondueAccount(ev:Event){
    ev.stopPropagation();
   this.dueAccount.emit()
  }
  ondueBackt(ev:Event){
    ev.stopPropagation();
   this.dueBack.emit()
  }
  onremindAccount(ev:Event){
    ev.stopPropagation();
    this.remindAccount.emit()
   }
   ondueDetail(ev:Event){
    ev.stopPropagation();
    this.itemSelected.emit()
   }
   ondueCompensation(ev:Event){
    ev.stopPropagation();
    this.dueCompensation.emit()
   }
   onpromptCompensation(ev:Event){
    ev.stopPropagation();
    this.promptCompensation.emit()
   }
}
