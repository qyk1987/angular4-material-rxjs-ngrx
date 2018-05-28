import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {cardAnimate} from '../../animates/card.animate';
@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardAnimate],
})
export class ClassItemComponent   {


  @Input() item;
  @Output() itemSelected = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() addStudent = new EventEmitter<void>();
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

  onClick(ev: Event) {
    ev.preventDefault();
    this.itemSelected.emit();
  }

  // openUpdateDialog(ev: Event) {
  //   ev.preventDefault();
  //   this.launchUpdateDialog.emit();
  // }

  onEdit(ev: Event) {
    ev.preventDefault();
    this.update.emit();
  }
  onMoveStudent(ev: Event) {
    ev.preventDefault();
    this.addStudent.emit();
  }
  onDelete(ev: Event) {
    ev.preventDefault();
    this.delete.emit();
  }

}
