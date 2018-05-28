import { Component,OnInit,forwardRef,OnDestroy,Input,EventEmitter,Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl} from '@angular/forms'
import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  differenceInCalendarDays,
  isValid,
  isFuture,
  differenceInQuarters,
  differenceInWeeks,
  subWeeks,
  addHours
}from 'date-fns';
import {isVlaidDate} from '../../utils/date.util';
import { chinaDate } from '../../utils/reduer.util';
export enum TimeSpan{
  Year=0,
  Month,
  Week,
  Day
}

export interface FormDate{
  startDate:Date;
  endDate:Date;
  timeSpan:TimeSpan;
}
@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>DateInputComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>DateInputComponent),
      multi:true
    }
    
  ]
})

export class DateInputComponent implements ControlValueAccessor,OnInit,OnDestroy {
  @Output('update') update = new EventEmitter<void>();
  form:FormGroup;
  sub:Subscription;
  timeSpans=[
    {value:TimeSpan.Year,label:'年'},
    {value:TimeSpan.Month,label:'月'},
    {value:TimeSpan.Week,label:'周'},
    {value:TimeSpan.Day,label:'天'}
  ];
  isMonday=new Date().getDay()===1;
  isOne=new Date().getDate()===1;
  
  constructor(private fb:FormBuilder) { }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    this.form=this.fb.group({  
      formDate:this.fb.group({
        startDate:['',this.validateStart],
        endDate:[''],
        timeSpan:['']
      },{validator:this.validateDate('startDate','endDate','timeSpan')})
    });
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  setDate(n){
    const date=new Date();
    switch(n){
      case 1:{
        this.form.get('formDate').get('startDate').patchValue(subDays(date,6));//subDays(new Date(),7);
        this.form.get('formDate').get('endDate').patchValue(date);
        this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
        break;
      }
      case 2:{
        this.form.get('formDate').get('startDate').patchValue(subDays(date, date.getDay()===0?6:date.getDay()-1));//subDays(new Date(),7);
        this.form.get('formDate').get('endDate').patchValue(date);
        this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
        break;
      }
      case 3:{
        this.form.get('formDate').get('startDate').patchValue(subDays(subWeeks(date,1) , date.getDay()===0?6:date.getDay()-1));//subDays(date,7);
        this.form.get('formDate').get('endDate').patchValue(subDays(date , date.getDay()===0?7:date.getDay()));
        this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
        break;
      }
      case 4:{
        this.form.get('formDate').get('startDate').patchValue(subDays(date,29));//subDays(date,7);
        this.form.get('formDate').get('endDate').patchValue(date);
        this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
        break;
      }
      case 5:{
        this.form.get('formDate').get('startDate').patchValue(subDays(date, date.getDate()-1));//subDays(date,7);
        this.form.get('formDate').get('endDate').patchValue(date);
        this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
        break;
      }
      case 6:{
        this.form.get('formDate').get('startDate').patchValue(subDays(subMonths(date,1) , date.getDate()-1));//subDays(date,7);
        this.form.get('formDate').get('endDate').patchValue(subDays(date , date.getDate()));
        this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
        break;
      }
    }
    
    
  }
  writeValue(obj: any): void{
    if(obj){
      //console.log(obj);
      this.form.get('formDate').get('startDate').patchValue(obj.startDate);//subDays(new Date(),7);
      this.form.get('formDate').get('endDate').patchValue(obj.endDate);
      this.form.get('formDate').get('timeSpan').patchValue(TimeSpan.Day);
    }
  }
  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void{

  }
  updateDate(){
    this.update.emit();
  }
  validate(c:FormControl):{[key:string]:any}{
    const val=c.value;
    if(!val){
      return null;
    }

    return {
      dateOfBirthInvalid:true
    }
  }

  validateStart(c:FormControl):{[key:string]:any}{
    const val=c.value;
    return isVlaidDate(val)?null:{
        startDateInvalid:true
      };
  }
  validateDate(startDateKey:string,endDateKey:string,spanKey:string){
    return (group:FormGroup):{[key:string]:any}=>{
      const startDate=group.controls[startDateKey];
      const endDate=group.controls[endDateKey];
      const timeSpan=group.controls[spanKey];
      let result=false;
      const start=startDate.value;
      const end=endDate.value;
      if(!isVlaidDate(start)){
        return {
          startDateInvalid:true
        };
      }
     
      const sdate=parse(start);
      const edate=parse(end);
      if(!isVlaidDate(end)||sdate>=edate){
        return {
          endDateInvalid:true
        };
      }
      switch(timeSpan.value){
        case TimeSpan.Year:{
          result=differenceInYears(sdate,edate)<0
          break;
        }
        case TimeSpan.Month:{
          result=differenceInYears(sdate,edate)<0||differenceInMonths(sdate,edate)<0;
          break;
        }
        case TimeSpan.Week:{
          result=differenceInYears(sdate,edate)<0||differenceInMonths(sdate,edate)<0||differenceInWeeks(sdate,edate)<0;
          break;
        }
        case TimeSpan.Day:{
          //console.log(differenceInDays(sdate,edate));
          result=differenceInDays(sdate,edate)<0;
          break;
        }
        default:{
          break;
        }
      }
      if(result){
        const value:FormDate={
          startDate:sdate,
          endDate:edate,
          timeSpan:timeSpan.value
        };
        this.propagateChange(value);
      }

      return result?null:{spanInvalid:true};
    };
    
  }
  startFilter = (d: Date): boolean => {
    //console.log(this._data.endDate);
    //console.log(d);
    //console.log(this.form.get('formDate').get('endDate').value);
    return this.form.get('formDate').get('endDate').value?d<this.form.get('formDate').get('endDate').value:true;
  }

  endFilter = (d: Date): boolean => {
    //console.log(this._data.endDate);
    //console.log(d);
    //console.log(new Date());
    //console.log(this.form.get('formDate').get('startDate').value);
    return d<=new Date()&&d>this.form.get('formDate').get('startDate').value;
  }


}
