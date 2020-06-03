import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDComponent } from './order-d.component';

describe('OrderDComponent', () => {
  let component: OrderDComponent;
  let fixture: ComponentFixture<OrderDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
