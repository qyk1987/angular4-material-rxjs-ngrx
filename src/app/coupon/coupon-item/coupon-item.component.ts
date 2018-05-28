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
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardAnimate],
})
export class CouponItemComponent  {
  @Input() item;
  @Output() addProduct = new EventEmitter<void>();
  @Output() addCampus = new EventEmitter<void>();
  @Output() editCoupon = new EventEmitter<void>();
  @Output() deleteCoupon = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  constructor() { }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.cardState = 'out';
  }
  onaddProduct(ev:Event){
    ev.stopPropagation();
    this.addProduct.emit();
  }
  onaddCampus(ev:Event){
    ev.stopPropagation();
    this.addCampus.emit();
  }
  oneditCoupon(ev:Event){
    ev.stopPropagation();
    this.editCoupon.emit();
  }
  ondeleteCoupon(ev:Event){
    ev.stopPropagation();
    this.deleteCoupon.emit();
  }

}
