import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorDialogComponent } from './locator-dialog.component';

describe('LocatorDialogComponent', () => {
  let component: LocatorDialogComponent;
  let fixture: ComponentFixture<LocatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
