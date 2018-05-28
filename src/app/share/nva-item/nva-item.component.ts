import { Component, OnInit ,Input,EventEmitter,Output,HostBinding,HostListener,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-nva-item',
  templateUrl: './nva-item.component.html',
  styleUrls: ['./nva-item.component.scss']
})
export class NvaItemComponent implements OnInit {

  @Input() item:any;
  @Input() hasCount=false;
  @Output() slide=new EventEmitter<void>();
  @Output() selectItem=new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onSlideClick(){
    this.slide.emit();
  }
  onItemClcik(list){
    this.selectItem.emit(list);
  }
}
