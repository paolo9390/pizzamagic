import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertDrinkComponent } from './dessert-drink.component';

describe('DessertDrinkComponent', () => {
  let component: DessertDrinkComponent;
  let fixture: ComponentFixture<DessertDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
