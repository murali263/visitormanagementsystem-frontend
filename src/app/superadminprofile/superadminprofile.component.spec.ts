import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminprofileComponent } from './superadminprofile.component';

describe('SuperadminprofileComponent', () => {
  let component: SuperadminprofileComponent;
  let fixture: ComponentFixture<SuperadminprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
