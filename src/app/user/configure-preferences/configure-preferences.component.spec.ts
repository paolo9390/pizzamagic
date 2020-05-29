import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePreferencesComponent } from './configure-preferences.component';

describe('ConfigurePreferencesComponent', () => {
  let component: ConfigurePreferencesComponent;
  let fixture: ComponentFixture<ConfigurePreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurePreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
