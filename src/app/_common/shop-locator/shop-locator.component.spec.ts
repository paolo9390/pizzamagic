import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLocatorComponent } from './shop-locator.component';

describe('ShopLocatorComponent', () => {
  let component: ShopLocatorComponent;
  let fixture: ComponentFixture<ShopLocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopLocatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
