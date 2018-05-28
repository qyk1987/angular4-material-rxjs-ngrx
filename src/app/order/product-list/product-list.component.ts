import { Component, OnInit ,OnDestroy,HostBinding,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { routerAnimate } from '../../animates/router.animate';
import { listAnimate } from '../../animates/list.animate';
import {NewOrderComponent} from '../new-order/new-order.component'
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as actions from  '../../actions/category.action' ;
import * as prdActions from  '../../actions/product.action' ;
import * as copActions from  '../../actions/coupon.action' ;
import {Store} from '@ngrx/store';
import { Category, Product } from '../../domain';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations:[
    routerAnimate
  ],
})
export class ProductListComponent implements OnInit,OnDestroy {
  @HostBinding('@router') state;
  selectedTab = 0;
  sub:Subscription;
  categorys$:Observable<Category[]>;
  products$:Observable<Product[]>;
  listAnim$: Observable<number>;
  constructor(
    private dialog:MdDialog,
    private cd:ChangeDetectorRef,   
    private store$:Store<fromRoot.State>
  ) { 


    this.store$.select(fromRoot.getSelectedPost)
      .take(1)
      .subscribe(post=>{
        //console.log(post);
        this.store$.dispatch(new prdActions.LoadWithCouponByCampusAction(post.CampusId));}
      );
    
    this.categorys$=this.store$.select(fromRoot.getCategorys);
    this.categorys$.take(1)
      .subscribe(cs=>{
        //console.log(cs[0]);
        if(cs.length>0){
          this.store$.dispatch(new actions.SelectAction(cs[0]));
        }
        });
    this.products$=this.store$.select(fromRoot.getProductsBySelectedCategory);
    this.listAnim$=this.products$.map(p=>p.length);
  }

  ngOnInit() {
  }

  prevTab() {
    this.selectedTab = this.selectedTab-1;
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  nextTab() {
    this.selectedTab = this.selectedTab+1;
  }

  onTabChange(index) {
    this.selectedTab = index;
    this.categorys$.take(1)
    .subscribe(cs=>this.store$.dispatch(new actions.SelectAction(cs[index])));
  }
  openInviteDialog(product){
    const dialogRef=this.dialog.open( 
      NewOrderComponent,
      {data:{product:product}});
  }
}
