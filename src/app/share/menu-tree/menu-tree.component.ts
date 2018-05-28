import { Component, OnInit,Input,Output, EventEmitter,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})

export class MenuTreeComponent implements OnInit {

  @Input() items;
  @Input() root=false;
  @Output() select = new EventEmitter<NodeData>();
  @Output() add = new EventEmitter<NodeData>();
  @Output() edit = new EventEmitter<NodeData>();
  @Output() delete = new EventEmitter<NodeData>();
  constructor() { }

  ngOnInit() {
  }
  onClick(ev:Event,level,item){
      ev.stopPropagation();
      const data={
        level:level,
        item:item
      }
      //console.log(data);
      this.select.emit(data);
  }
  onAdd(ev:Event,level,item){
      ev.stopPropagation();
      const data={
        level:level,
        item:item
      }
      this.add.emit(data);
  }
  onEdit(ev:Event,level,item){
    ev.stopPropagation();
    const data={
      level:level,
      item:item
    }
    this.edit.emit(data);
  }
  onDel(ev:Event,level,item){
    ev.stopPropagation();
    const data={
      level:level,
      item:item
    }
    this.delete.emit(data);
  }
  onSelect(data){
    this.select.emit(data);
  }
  handleedit(data){
    this.edit.emit(data);
  }
  handleadd(data){
    this.add.emit(data);
  }
  handledelete(data){
    this.delete.emit(data);
  }

}
export interface NodeData{
  level:number,
  item:any
}