import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitordetailsComponent } from './visitordetails.component';

describe('VisitordetailsComponent', () => {
  let component: VisitordetailsComponent;
  let fixture: ComponentFixture<VisitordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
