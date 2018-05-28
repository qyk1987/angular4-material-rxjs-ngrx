import { Component, OnInit,Input,forwardRef,EventEmitter,Output,HostBinding,HostListener,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {} from '@angular/forms'
import { StuFilter } from '../../domain';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/stuFilter.action' ;
import {Store} from '@ngrx/store';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss']
})
export class StudentFilterComponent implements OnInit {
  @Input() filter=null;
  selectAll:boolean[]=[true,true,true,true,true,true];
  postIds:string[];
  @Output() change = new EventEmitter<StuFilter>();
  constructor(
    private studentService$:StudentService,
    private cd:ChangeDetectorRef,
    private store$:Store<fromRoot.State>
  ) { }
  private propagateChange=(_:any)=>{};
  ngOnInit() {
    if(this.filter!=null){
      this.loadByFilter();
      this.postIds=this.filter.postIds;
      console.log(this.postIds);

    }
    
    
    
  }

  onClickAll(n){
    switch(n){
      case 0:{
        this.filter.grades.forEach(g=>g.selected=false);
        this.selectAll[0]=true;        
        break;
      }
      case 1:{
        this.filter.majors.forEach(g=>g.selected=false);
        this.selectAll[1]=true;
        break;
      }
      case 2:{
        this.filter.schools.forEach(g=>g.selected=false);
        this.selectAll[2]=true;
        break;
      }
      case 3:{
        this.filter.intros.forEach(g=>g.selected=false);
        this.selectAll[3]=true;
        break;
      }
      case 4:{
        this.filter.educations.forEach(g=>g.selected=false);
        this.selectAll[4]=true;
        break;
      }
    } 
    this.checkFilter();  
  }
  onClickCheckbox(n,i){
   
    switch(n){
      case 0:{
        this.filter.grades[i].selected=!this.filter.grades[i].selected;    
        break;
      }
      case 1:{
        this.filter.majors[i].selected=!this.filter.majors[i].selected;     
        break;
      }
      case 2:{
        this.filter.schools[i].selected=!this.filter.schools[i].selected;     
        break;
      }
      case 3:{
        this.filter.intros[i].selected=!this.filter.intros[i].selected;     
        break;
      }
      case 4:{
        this.filter.educations[i].selected=!this.filter.educations[i].selected;    
        break;
      }
    }
    this.switchAll();
    this.checkFilter();
    
  }

  /*
  每次点击筛选选项，都要检查选择情况
  */ 
  checkFilter(){//检查选择器列表并将值写入选择器
    const filter:StuFilter={
      postIds:this.filter.postIds,
      gradeIds:[],
      majorIds:[],
      schoolIds:[],
      introIds:[],
      eduIds:[]
    }
    this.filter.grades.forEach(g=>{  //检查年级
      if(g.selected){
        filter.gradeIds.push(g.id);
      }
    });
    this.filter.majors.forEach(m=>{//检查专业
      if(m.selected){
        filter.majorIds.push(m.id);
      }
    });
    this.filter.schools.forEach(s=>{
      if(s.selected){
        filter.schoolIds.push(s.id);//检查学校  由于学校跟校区相关，所以最终不需要校区
      }
    });
    this.filter.intros.forEach(i=>{
      if(i.selected){
        filter.introIds.push(i.id);
      }
    });
    this.filter.educations.forEach(i=>{
      if(i.selected){
        filter.eduIds.push(i.id);
      }
    });
    this.change.emit(filter);
    
  }

  loadByFilter(){//负责每次生成页面时检查当前选择器状态，然后写入到选择器列表
    this.store$.select(fromRoot.getStuFilter)
      .take(1)
      .subscribe(sf=>{
        this.filter.grades.forEach(g => {
          if(sf.gradeIds.indexOf(g.id)>-1){
            g.selected=true;
          }
        });
        this.filter.majors.forEach(m => {
          if(sf.majorIds.indexOf(m.id)>-1){
            m.selected=true;
          }
        });
        this.filter.educations.forEach(e => {
          if(sf.eduIds.indexOf(e.id)>-1){
            e.selected=true;
          }
        });
        this.filter.intros.forEach(i => {
          if(sf.introIds.indexOf(i.id)>-1){
            i.selected=true;
          }
        });
        this.filter.schools.forEach(s => {
          if(sf.schoolIds.indexOf(s.id)>-1){
            s.selected=true;
          }
        });
        this.switchAll();
      });
  }


  switchAll(){//检查如果所有子项全部都选中了 就全部取消选中，转而选中全部
    this.selectAll[0]=Math.abs(this.filter.grades.map(g=>g.selected==true?1:-1).reduce(function(prev, cur) {//selected位true记1 false记-1  都为true或者false求和的结果的绝对值就等于长度
                return cur + prev;
              }, 0))===this.filter.grades.length;
    if(this.selectAll[0]){
      this.filter.grades.forEach(g=>{
        g.selected=false;
      }); 
    }


    this.selectAll[1]=Math.abs(this.filter.majors.map(g=>g.selected==true?1:-1).reduce(function(prev, cur) {//selected位true记1 false记-1  都为true或者false求和的结果的绝对值就等于长度
                return cur + prev;
              }, 0))===this.filter.majors.length;
    if(this.selectAll[1]){
      this.filter.majors.forEach(g=>{
        g.selected=false;
      }); 
    }
    this.selectAll[2]=Math.abs(this.filter.schools.map(g=>g.selected==true?1:-1).reduce(function(prev, cur) {//selected位true记1 false记-1  都为true或者false求和的结果的绝对值就等于长度
                return cur + prev;
              }, 0))===this.filter.schools.length;
    if(this.selectAll[2]){
      this.filter.schools.forEach(g=>{
        g.selected=false;
      }); 
    }

    this.selectAll[3]=Math.abs(this.filter.intros.map(g=>g.selected==true?1:-1).reduce(function(prev, cur) {//selected位true记1 false记-1  都为true或者false求和的结果的绝对值就等于长度
                return cur + prev;
              }, 0))===this.filter.intros.length;
    if(this.selectAll[3]){
      this.filter.intros.forEach(g=>{
        g.selected=false;
      }); 
    }


    this.selectAll[4]=Math.abs(this.filter.educations.map(g=>g.selected==true?1:-1).reduce(function(prev, cur) {//selected位true记1 false记-1  都为true或者false求和的结果的绝对值就等于长度
                return cur + prev;
              }, 0))===this.filter.educations.length;
    if(this.selectAll[4]){
      this.filter.educations.forEach(g=>{
        g.selected=false;
      }); 
    }
  }
}

