import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideOrdersComponent } from './side-orders.component';

describe('SideOrdersComponent', () => {
  let component: SideOrdersComponent;
  let fixture: ComponentFixture<SideOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
