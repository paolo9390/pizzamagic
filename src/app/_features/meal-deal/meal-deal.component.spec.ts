import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDealComponent } from './meal-deal.component';

describe('MealDealComponent', () => {
  let component: MealDealComponent;
  let fixture: ComponentFixture<MealDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
