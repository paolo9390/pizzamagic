import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarlicBreadComponent } from './garlic-bread.component';

describe('GarlicBreadComponent', () => {
  let component: GarlicBreadComponent;
  let fixture: ComponentFixture<GarlicBreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarlicBreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarlicBreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
