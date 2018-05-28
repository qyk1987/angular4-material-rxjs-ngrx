import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { Coupon } from '../../domain/index';
import { CouponService } from '../../services/coupon.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-coupon-chips-list',
  templateUrl: './coupon-chips-list.component.html',
  styleUrls: ['./coupon-chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CouponChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CouponChipsListComponent),
      multi: true
    }

  ]
})
export class CouponChipsListComponent implements ControlValueAccessor, OnInit {

  @Input() multiple = true;
  @Input() placeholderText = "请输入优惠券";
  @Input() label = "添加/修改数据";
  chips: FormGroup;
  items: Coupon[] = [];
  memberResults$: Observable<Coupon[]>;
  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) { }
  private propagateChange = (_: any) => { };
  ngOnInit() {
    this.chips = this.fb.group({
      memberSelect: ['']
    });
    this.memberResults$ = this.store$.select(fromRoot.getCoupons);
    this.chips.get('memberSelect').valueChanges
      .debounceTime(300)
      .subscribe(member => {
        if (this.items.map(item => item.Id).indexOf(member.Id) !== -1) {
          return;
        }
        this.items = this.multiple ? [...this.items, member] : [member];
        this.propagateChange(this.items);
        return null;
      });
  }
  writeValue(obj: any): void {
    if (obj && this.multiple) {
      const ids = obj.map(o => o.Id);
      if (this.items) {
        const remaining = this.items.filter(item => !(ids.indexOf(item.Id) > -1));
        this.items = [...remaining, ...obj];
      }
    }
    else if (obj && !this.multiple) {
      this.items = [...obj];
    }
    console.log(this.items);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  validate(c: FormControl): { [key: string]: any } {
    return this.items ? null : {
      chipListInvalid: true
    }
  }
  removeMember(member: Coupon) {
    const ids = this.items.map(item => item.Id);
    const i = ids.indexOf(member.Id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.propagateChange(this.items);
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }

}
