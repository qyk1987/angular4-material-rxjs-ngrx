import { Component, OnInit,Input,forwardRef,EventEmitter,Output,HostBinding,HostListener,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { isNumber } from 'util';
import {covertArrToObj, buildObjFromArr,updateOne,sortBy} from '../../utils/reduer.util';
import { json2xls,fs} from 'json2xls';
import { JSONToExcelConvertor} from '../../utils/table.util'
import { ToggleData } from '../../vm';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() setting={
    columns:[],
    class:[true,false,false,false],
    isFixHeader:false,
    hasTotal:false,
    hasCheckBox:false,
    showAdd:false,
    showEdit:false,
    showDelete:false,
    showPageNum:true,
    showExport:false,
    pageNums:[10,25,50,100,'all'],
    showColumns:false
  };
  num;
  @Input() data:any[];
  @Output() clickItem=new EventEmitter<any>();
  @Output() selectItems=new EventEmitter<any>();
  @Output() editItem=new EventEmitter<any>();
  @Output() delItem=new EventEmitter<any>();
  @Output() addItem=new EventEmitter<void>();
  @Output() changeNum=new EventEmitter<any>();
  @Output() toggle=new EventEmitter<ToggleData>();
  total:any[]=[];
  columns:any[];
  fileds:any[];
  showlist:boolean=false;
  selectall=false;
  constructor(
    private cd:ChangeDetectorRef,
  ) { 
    
  }

  ngOnInit() {
    if(this.setting.hasTotal){
      this.setting.columns.forEach(e => {
        if(e.total){
          const val=this.data.map(d=>{
            if(isNumber(d[e.filed])){
              return d[e.filed];
            }else{
              return 0;
            }
          }).reduce(function(prev, cur, index, arr) {
            return prev+cur;
           });
           this.total.push(val);
        }else{
          this.total.push("-");
        }
      });
      this.total[0]="总计";
      //console.log(this.total);
    }
    this.sort();
    this.columns=this.setting.columns.map(col=>{
      return {
        ...col,
        selected:true
      }
    });
    this.data=this.data.map(d=>{
      return {
        ...d,
        selected:false
      }
    });
    this.fileds=this.columns.filter(c=>c.selected)
    console.log(this.data);
  }


  sort(){

    for (var e of  this.setting.columns) { 
      
        if(e.sort==="asc"){
          this.data=this.data.sort(sortBy(e.filed,true));
          break;
        }
        if(e.sort==="desc"){
          this.data=this.data.sort(sortBy(e.filed,false));
          break;
        }
        
      }
      
  }
  onClickItem(ev:Event,item){
    ev.stopPropagation();
    this.clickItem.emit(item);
  }
  onEdit(ev:Event,item){
    ev.stopPropagation();
    this.editItem.emit(item);
  }
  onDelete(ev:Event,item){
    ev.stopPropagation();
    this.delItem.emit(item);
  }
  onAdd(ev:Event){
    ev.stopPropagation();
    this.addItem.emit();
  }
  onChangeNum(){
    //ev.stopPropagation();
    
    //console.log(this.num);
    this.changeNum.emit(this.num);
  }
  onToggle(ev:Event,filed,item){
    //ev.stopPropagation();
    // if(!filed.enabled){
    //   item[filed.filed]=!item[filed.filed];
    //   return;
    // }
    const data:ToggleData={
      filed:filed.filed,
      item:item
    }
    this.toggle.emit(data);
  }
  toggleClick(ev:Event){
    ev.stopPropagation();
  }
  onExport(){
   
  const columns=this.columns.filter(c=>c.selected).map(c=>{
    return {
      filed:c.filed,
      label:c.title
    }
  })
  console.log(columns);
  // [
  //   {filed:"Id",label:'编号'},
  //   {filed:"Name",label:'姓名'},
  //   {filed:"IdCardNO",label:'身份证号'},
  //   {filed:"MobilePhoneNO",label:'手机号'},
    // {filed:"Id",label:'编号'},
    // {filed:"Id",label:'编号'},
    // {filed:"Id",label:'编号'},
    // {filed:"Id",label:'编号'},
    // {filed:"Id",label:'编号'},
    // {filed:"Id",label:'编号'},
  //];
  JSONToExcelConvertor(this.data, "feiyangExport", columns);


  }

  onClickFiled(ev:Event){
    ev.stopPropagation();
   
    
  }
  checkFiledChanged(i){
    this.columns[i].selected=!this.columns[i].selected;
    this.fileds=this.columns.filter(c=>c.selected)
  }

  checkAll(ev:Event){
    this.selectall=!this.selectall;
    if(this.selectall){
      this.data.forEach(d=>d.selected=true);
    }else{
      this.data.forEach(d=>d.selected=false);
    }
    this.checkSelect();
  }
  check(ev:Event,i){
    this.data[i].selected=!this.data[i].selecte;
    this.selectall=false;
    this.checkSelect();
  }

  checkSelect(){
    this.selectItems.emit(this.data.filter(d=>d.selected));
  }
}
