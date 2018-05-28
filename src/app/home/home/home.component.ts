import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as prdActions from '../../actions/product.action';
import * as schActions from '../../actions/school.action';
import * as dipActions from '../../actions/diploma.action';
import * as catActions from '../../actions/category.action';
import * as couActions from '../../actions/coupon.action';
import * as camActions from '../../actions/campus.action';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
  
    private store$:Store<fromRoot.State>
  ) {
    this.store$.select(fromRoot.getSelectedPost).take(1)
      .subscribe(duty=>{
            // if(duty.CampusId!==null){
            //   this.store$.dispatch(new prdActions.LoadWithCouponByCampusAction(duty.CampusId));
            //   this.store$.dispatch(new couActions.LoadByCampusAction(duty.CampusId));
            // }else{
            //   this.store$.dispatch(new prdActions.LoadAction(null));
            // }
            // this.store$.dispatch(new schActions.LoadAction(null));
            // this.store$.dispatch(new dipActions.LoadAction(null));
            // this.store$.dispatch(new catActions.LoadAction(null));
            // this.store$.dispatch(new camActions.LoadAction(null));
            //this.store$.dispatch(new prdActions.LoadAction(null));
      });
      
   }

  ngOnInit() {
  }

}
