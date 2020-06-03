import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsMealComponent } from './kids-meal.component';

describe('KidsMealComponent', () => {
  let component: KidsMealComponent;
  let fixture: ComponentFixture<KidsMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
