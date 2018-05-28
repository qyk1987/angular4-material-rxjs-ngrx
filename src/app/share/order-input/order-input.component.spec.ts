import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInputComponent } from './order-input.component';

describe('OrderInputComponent', () => {
  let component: OrderInputComponent;
  let fixture: ComponentFixture<OrderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
