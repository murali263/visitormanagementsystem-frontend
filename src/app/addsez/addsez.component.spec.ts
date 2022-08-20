import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsezComponent } from './addsez.component';

describe('AddsezComponent', () => {
  let component: AddsezComponent;
  let fixture: ComponentFixture<AddsezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
