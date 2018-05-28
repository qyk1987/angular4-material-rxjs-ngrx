import {ChangeDetectionStrategy, EventEmitter, Component,Input,Output, forwardRef} from '@angular/core';
import {ControlValueAccessor,NG_VALUE_ACCESSOR,NG_VALIDATORS,FormControl} from '@angular/forms'
@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ImageListSelectComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ImageListSelectComponent),
      multi:true
    }
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input() cols=6;
  @Input() rowHeight='64px';
  @Input() title="选择";
  @Input() items:string[]=[];
  @Input() useSvgIcon=false;
  @Input() itemWidth='80px';
  private selected;
  @Output('itemChange') itemChange = new EventEmitter<string>();
  constructor() { }
  private propagateChange=(_:any)=>{};
  
  onChange(i){
    this.selected=this.items[i];
    this.propagateChange(this.items[i]);
    this.itemChange.emit(this.items[i]);
  }
  writeValue(obj: any){
    this.selected=obj;
  }
  registerOnChange(fn: any){
    this.propagateChange=fn;
  }
  registerOnTouched(fn: any){

  }

  validate(c:FormControl){
    return this.selected?null:{
      imageListInvalid:{
        valid:false
      }
    };
  }


}
