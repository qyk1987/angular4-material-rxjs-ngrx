import { Component, OnInit,Inject } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import { Product, Spot, Student ,Order, Campus} from '../../domain';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as campusActions from '../../actions/campus.action';
import * as prdActions from '../../actions/product.action';
import * as cartActions from '../../actions/cart.action';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  title="报名";
  campus$:Observable<Campus[]>;
  productName:string;
  price:number;
  form:FormGroup;
  orders$:Observable<any[]>;
  length$:Observable<number>;
  error:boolean;
  constructor() { }

  ngOnInit() {
  }
  onSubmit({value,valid},ev:Event){
   
  }
}
