import { Component, OnInit,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/receipt.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as cartActions from  '../../actions/cart.action' ;
import {Store} from '@ngrx/store';
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
import { Auth } from '../../domain';
import { Subject } from 'rxjs/Subject';
import { LineChartVM, PieChartVM } from '../../vm';
import { ChartService } from '../../services';
import { chinaDate } from '../../utils/reduer.util';
export interface FormDate{
  startDate:Date;
  endDate:Date;
  timeSpan:number
}
export interface chartModel{
  loading:boolean;
  option?:any;
  show:boolean;
  pieoption?:any;
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations:[
    routerAnimate
  ],
})

export class ReportComponent implements OnInit,OnDestroy {

  labels=['区域','科目','人员','付款方式'];
  selectedTab=0;
  auth:Auth;
  formDate:FormDate={
    startDate:chinaDate(subDays(new Date(),7)),
    endDate:chinaDate(new Date()),
    timeSpan:3
  };
  _date = new Subject<FormDate>();
  _tab = new Subject<number>();
  charts:{[id:string]:chartModel}={
    'chartDis':{
       show:false,
       loading:true
    },
    'chartCam':{
      show:false,
      loading:true
   },
    'chartSpot':{
      show:false,
      loading:true
   },
   'chartCategory':{
    show:true,
    loading:true
    },
    'chartSeller':{
     show:true,
     loading:true
     },
  }
chartoption={};
isloading=true;
tempCharts:{[id:string]:chartModel}={};
tempTitles:string[];
  private _sub: Subscription;
  constructor(
    private cd:ChangeDetectorRef,   
    private store$:Store<fromRoot.State>,
    private service$:ChartService, 
  ) { 
    
    
  }
  @HostBinding('@router') state;
  ngOnInit() {

    const date$ = this._date.asObservable().startWith(this.formDate);
    const tab$ = this._tab.asObservable().startWith(0);
    const val$ = Observable.combineLatest([date$, tab$], (_d, _t) => {
      return {
        formdate: _d,
        tab: _t
      };
    });
    this._sub = val$.subscribe(v => {
      //console.log(v );
      this.store$.select(fromRoot.getSelectedPost).take(1)
      .subscribe(duty=>{
          if(duty.SpotId===null&&duty.CampusId!==null){
            this.charts['chartCam'].show=true;
          }
          if(duty.CampusId===null&&duty.DistrictId!==null){
            this.charts['chartDis'].show=true;
          }
          if(duty.SpotId!==null){
            this.charts['chartSpot'].show=true;
          }
          this.tempCharts={};//清空临时图表数据
          switch(v.tab){
              case 0:{
                if(this.charts.chartDis.show){
                  this.service$.getCampusStackByManager({...this.formDate,postId:duty.PostId}).take(1)
                  .subscribe(c=>{
                    this.setStackOption(c,'各校区业绩','chartDis',true);
                    //this.chartoption=this.charts['chartDis'].option;
                    //this.isloading=false;
                    console.log(111);
                    this.tempTitles=c.chartDatas.map(d=>d.name);
                    this.tempTitles.forEach(title=>{
                      this.tempCharts[title]={
                        show:true,
                        loading:true
                      }
                    });
                    this.service$.getSpotStackByManager({...this.formDate,postId:duty.PostId}).take(1)
                    .subscribe(list=>{
                      list.forEach(l=>{
                        this.setStackOption(l.data,l.title+"各服务点业绩",l.title,false);
                      })
                    });
                  });
                  
                }

                if(this.charts.chartCam.show){
                  this.service$.getSpotStackByMaster({...this.formDate,campusid:duty.CampusId}).take(1)
                  .subscribe(c=>{
                    this.setStackOption(c,'各服务点业绩','chartCam',true);

                    });
  
                }

                if(this.charts.chartSpot.show){
                  this.service$.getSpotBySpot({...this.formDate,spotid:duty.SpotId}).take(1)
                  .subscribe(c=>{
                    this.setBasicOption(c,duty.SpotName+'业绩走势图','chartSpot',true);

                    });
  
                }
              } break;
              case 1:{
                  
                  this.service$.getCategoryStackByManager({...v.formdate,postId:duty.PostId}).take(1)
                  .subscribe(c=>{
                    const title=duty.SpotId!==null?duty.SpotName:duty.CampusId!==null?duty.CampusName:duty.DistrictName;
                    this.setStackOption(c,title+'各大类业绩','chartCategory',true);
                    //this.chartoption=this.charts['chartDis'].option;
                    //this.isloading=false;
                    //console.log(111);
                    this.tempTitles=c.chartDatas.map(d=>d.name);
                    this.tempTitles.forEach(title=>{
                      this.tempCharts[title]={
                        show:true,
                        loading:true
                      }
                    });
                    this.service$.getsubjectStackByManager({...v.formdate,postId:duty.PostId}).take(1)
                    .subscribe(list=>{
                      list.forEach(l=>{
                        this.setStackOption(l.data,l.title+"下各科目业绩",l.title,false);
                      })
                    });
                  });
                  


               
              
              }break;
              case 2:{
                
                this.service$.getSellerStackByManager({...v.formdate,postId:duty.PostId}).take(1)
                .subscribe(c=>{
                  const title=duty.SpotId!==null?duty.SpotName:duty.CampusId!==null?duty.CampusName:duty.DistrictName;
                  this.setStackOption(c,title+'所有课程顾问业绩','chartSeller',true);
                  //this.chartoption=this.charts['chartDis'].option;
                  //this.isloading=false;
                  console.log(111);
                  this.tempTitles=c.chartDatas.map(d=>d.name);
                  this.tempTitles.forEach(title=>{
                    this.tempCharts[title]={
                      show:true,
                      loading:true
                    }
                  });
                  // this.service$.getsubjectStackByManager({...this.formDate,postId:duty.PostId}).take(1)
                  // .subscribe(list=>{
                  //   list.forEach(l=>{
                  //     this.setStackOption(l.data,l.title+"下各科目业绩",l.title,false);
                  //   })
                  // });
                });
                


             
            
            }break;
          }
          
      });
    });

  }
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
  update(){
    this._date.next(this.formDate);
  }
  onTabChange(index) {
    this.selectedTab = index;
   this._tab.next(this.selectedTab);
  }
  prevTab() {
    this.selectedTab = this.selectedTab-1;
    this._tab.next(this.selectedTab);
  }
  nextTab() {
    this.selectedTab = this.selectedTab+1;
    this._tab.next(this.selectedTab);
  }

  setStackOption(data,title,key,foo){
    let chartOption={
      title: {
        text: title+'堆积走势图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:data.chartDatas.map(d=>d.name)
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataView: {show: true, readOnly: true},
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : data.chartLabels
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series :data.chartDatas.map(d=>{
        return {
          ...d,
          stack: '总计',
          type:'line',
          //areaStyle: {normal: {}},
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }
      }),
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }

    };
    

   let pieoption={
      title : {
          text: title+'分布图',
          subtext:title+'占比分部',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      toolbox: {
        feature: {
          saveAsImage: {show: true,},
          dataView: {show: true, readOnly: true},
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 30,
        bottom: 20,
        data: data.chartDatas.map(d=>d.name),
        selected: data.chartDatas.map(d=>true)
    },
      series : [
          {
              name: title+'分布图',
              type: 'pie',
              radius : '45%',
              center: ['50%', '55%'],
              data:data.chartDatas.map(d=>{
                return {
                  value:d.data.reduce(function(prev, cur, index, arr) {
                    return prev+cur;
                   }),
                  name:d.name
                }
              }),
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };


    foo?this.charts[key].option= chartOption:this.tempCharts[key].option=chartOption;
    foo?this.charts[key].loading= false:this.tempCharts[key].loading=false;
    foo?this.charts[key].pieoption= pieoption:this.tempCharts[key].pieoption=pieoption;
  }

  setBasicOption(data,title,key,foo){
    let chartOption={
      title: {
        text: title
      },
      tooltip : {
        trigger: 'axis'
      },

      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : data.map(d=>d.label)
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [{
        data: data.map(d=>d.data),
        type: 'line'
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }

    };
    
    foo?this.charts[key].option= chartOption:this.tempCharts[key].option=chartOption;
    foo?this.charts[key].loading= false:this.tempCharts[key].loading=false;
    
  }
}
