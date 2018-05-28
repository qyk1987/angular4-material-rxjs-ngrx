import { Component, OnInit,Input, ViewEncapsulation,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss']
})
export class NavListComponent implements OnInit {

  @Input() items;
  @Input() hasCount=false;
  @Output() select=new EventEmitter<any>();
  @Output() selectAll=new EventEmitter<any>();
  selected=true;
  constructor() { }

  ngOnInit() {
    this.selected=this.items===null?true:this.items.filter(item=>item.lists.filter(l=>l.selected).length>0).length===0;
  }
  handleSelect(data){
    this.cancelAll(data);
    this.select.emit(data);
    this.selected=this.items===null?true:this.items.filter(item=>item.lists.filter(l=>l.selected).length>0).length===0;
  }
  handleSlide(i){
    this.items[i].isopen=!this.items[i].isopen;
    this.items.filter((value,index)=>index!==i).forEach(element => {
      element.isopen=false;
    });
  }
  all(){
    this.cancelAll(null);
    this.selectAll.emit();
  }
  cancelAll(data){
    this.items.forEach(e => {
      e.lists.forEach(c => {
        if(data!==null&&data.id===c.id){
          c.selected=true;
        }else{
          c.selected=false;
        }
        
      });
    });
    this.selected=this.items===null?true:this.items.filter(item=>item.lists.filter(l=>l.selected).length>0).length===0;
  }
}
