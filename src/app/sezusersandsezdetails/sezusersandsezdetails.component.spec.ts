import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SezusersandsezdetailsComponent } from './sezusersandsezdetails.component';

describe('SezusersandsezdetailsComponent', () => {
  let component: SezusersandsezdetailsComponent;
  let fixture: ComponentFixture<SezusersandsezdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SezusersandsezdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SezusersandsezdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
