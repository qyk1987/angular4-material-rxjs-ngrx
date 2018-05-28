import { Component, OnInit,Input, Output, EventEmitter,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/page.action' ;
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../domain';
import { PageVM } from '../../vm';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  //@Input() page;
  // @Input() isAsc=true;
  // @Input() order="Id";
  // @Input() pageSize=10;
  @Input() hasTotal=true;
  page$:Observable<PageVM>;
  @Output() change = new EventEmitter<number>();
  page;
  constructor(
    private store$:Store<fromRoot.State>,
    private cd:ChangeDetectorRef
  ) { 
   
  }

  ngOnInit() {
    // const set={
    //   pageSize:this.pageSize,
    //   currentPage:1,
    //   count:0,
    //   isAsc:this.isAsc,
    //   order:this.order
    // }
    //console.log(this.page);
    //this.store$.dispatch(new actions.LoadAction(this.page));
    this.page$=this.store$.select(fromRoot.getPages);
    this.page$.subscribe(page=>{
      this.page=page;
      this.cd.markForCheck();
    });
  }
  goto(index){
    if(index!==0&&this.page.currentPage!==index){  
      this.change.emit({...this.page,currentPage:index});
        //this.store$.dispatch(new actions.SetAction(index));
    }
    
  }


}
