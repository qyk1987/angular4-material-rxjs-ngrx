import { Component,Input, OnInit,forwardRef,ChangeDetectionStrategy, EventEmitter,Output} from '@angular/core';
import {ControlValueAccessor,NG_VALUE_ACCESSOR,NG_VALIDATORS,FormControl} from '@angular/forms'
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ScheduleComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ScheduleComponent),
      multi:true
    }
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements ControlValueAccessor {

  @Input() cols=6;
  @Input() rowHeight='36px';
  @Input() title="选择";
  @Input() items:number[]=[];
  @Input() itemWidth='36px';
  @Input() onlyShow=false;
  @Input() titles=["周一","周二","周三","周四","周五","周六","周日"];
  private schedule:string;
  //items:number[]=[];  
  @Output('itemChange') itemChange = new EventEmitter<string>();
  constructor() { 

  }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    
    
  }

  onChange(i){
    if(!this.onlyShow){
      this.items[i]=Math.abs(this.items[i]-1);//减1在绝对值  这样1会变成0   0会变成1
      this.toValue();
      this.propagateChange(this.schedule);
      this.itemChange.emit(this.schedule);
    }
      

  }
  writeValue(obj: any){
    this.schedule=obj;
    this.toSchedule();
  }
  registerOnChange(fn: any){
    this.propagateChange=fn;
  }
  registerOnTouched(fn: any){

  }

  validate(c:FormControl){
    return this.schedule?null:{
      scheduleInvalid:{
        valid:false
      }
    };
  }
  toSchedule(){
    this.items= this.schedule.split("").map(c=>parseInt(c));//将字符串转换成单个字符组成的数组  "10010110"=>[1,0,0,1,0,1,1,0]
   }
   toValue(){
     this.schedule=this.items.join("");//相反操作  吧数组转换成对应的字符串
   }
}
