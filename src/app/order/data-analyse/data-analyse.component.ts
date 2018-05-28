import { Component, OnInit ,Inject,HostBinding,OnDestroy,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {MdDialog} from '@angular/material';
import {ChartService} from '../../services/index';
import * as fromRoot from '../../reducers';
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
import { Observable } from 'rxjs/Observable';
import { LineChartVM, PieChartVM } from '../../vm';
@Component({
  selector: 'app-data-analyse',
  templateUrl: './data-analyse.component.html',
  styleUrls: ['./data-analyse.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class DataAnalyseComponent implements OnInit {
  @HostBinding('@router') state;
  form:FormGroup;
  formDate={
    startDate:subDays(addHours(new Date(),8),7),
    endDate:addHours(new Date(),8),
    timeSpan:3
  };
  chart1:LineChartVM=null;
  piedata:PieChartVM[]=null;
  chartOption ={}; 
  pie1chartOption ={}; 
  pie2chartOption ={}; 
  pie3chartOption ={};
  isLoading = true;
  pieLoading1=true;
  pieLoading2=true;
  pieLoading3=true;
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,
    private fb:FormBuilder,
    private service$:ChartService,
    private store$:Store<fromRoot.State>
  ) { 
    this.getData();
  }

  ngOnInit() {

  }

  initChart(data){
    this.chartOption={
      title: {
        text: '业绩走势图'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:data.chartDatas.map(d=>d.name)
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
          stack: '总量',
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
    this.isLoading=false;
  }
  initPieChart(data,text,subtext){
    return  {
      title : {
          text: text,
          subtext:subtext,
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      // legend: {
      //     orient: 'vertical',
      //     left: 'left',
      //     data:data.map(d=>d.name)
      // },
      series : [
          {
              name: text,
              type: 'pie',
              radius : '45%',
              center: ['50%', '55%'],
              data:data,
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
  
  }
  getData(){
    this.store$.select(fromRoot.getAuth).take(1)
      .subscribe(auth=>{
        this.service$.getLineByDate({...this.formDate,postUserId:auth.currentDutyId}).take(1)
        .subscribe(c=>{
          this.initChart(c);
        });
        this.service$.getPieByDate({...this.formDate,postUserId:auth.currentDutyId,flag:"product"}).take(1)
        .subscribe(c=>{
          this.pie1chartOption=this.initPieChart(c,'产品业绩占比','分产品');
          this.pieLoading1=false;
        });
        this.service$.getPieByDate({...this.formDate,postUserId:auth.currentDutyId,flag:"category"}).take(1)
        .subscribe(c=>{
          this.pie2chartOption=this.initPieChart(c,'类别业绩占比','分类别');
          this.pieLoading2=false;
        });
        this.service$.getPieByDate({...this.formDate,postUserId:auth.currentDutyId,flag:"channel"}).take(1)
        .subscribe(c=>{
          this.pie3chartOption=this.initPieChart(c,'付款方式占比','分付款方式');
          this.pieLoading3=false;
        });
      });

    
  }

}
