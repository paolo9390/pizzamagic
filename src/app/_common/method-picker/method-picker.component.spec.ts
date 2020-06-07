import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodPickerComponent } from './method-picker.component';

describe('MethodPickerComponent', () => {
  let component: MethodPickerComponent;
  let fixture: ComponentFixture<MethodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
