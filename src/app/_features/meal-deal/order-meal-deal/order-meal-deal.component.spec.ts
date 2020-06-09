import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMealDealComponent } from './order-meal-deal.component';

describe('OrderMealDealComponent', () => {
  let component: OrderMealDealComponent;
  let fixture: ComponentFixture<OrderMealDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMealDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMealDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
