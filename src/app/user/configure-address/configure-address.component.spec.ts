import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureAddressComponent } from './configure-address.component';

describe('ConfigureAddressComponent', () => {
  let component: ConfigureAddressComponent;
  let fixture: ComponentFixture<ConfigureAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
