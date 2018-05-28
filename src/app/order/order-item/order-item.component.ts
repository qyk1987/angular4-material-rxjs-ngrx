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
import { Compensation } from '../../domain';
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardAnimate],
})
export class OrderItemComponent  {
  @Input() item;
  @Input() card:boolean=true;
  @Output() itemSelected = new EventEmitter<void>();
  @Output() onApplyAccount = new EventEmitter<void>();
  @Output() onCompenssion = new EventEmitter<void>();
  @Output() onEditCps = new EventEmitter<Compensation>();
  @Output() onDelCps = new EventEmitter<Compensation>();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  channels=this.baseData.channel;
  @HostBinding('@card') cardState = 'out';
  constructor(
    @Inject('BASE_DATA') private baseData,
  ) { }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.cardState = 'out';
  }

  onClick(ev: Event) {
    ev.preventDefault();
    this.itemSelected.emit();
  }
  applyAccount(){
    this.onApplyAccount.emit();
  }
  editOrder(){
    this.onEdit.emit();
  }
  delOrder(){
    this.onDelete.emit();
  }
  compenssion(){
    this.onCompenssion.emit();
  }
  editCompensation(item){
    this.onEditCps.emit(item)
  }
  delCompensation(item){
    this.onDelCps.emit(item)
  }
}
