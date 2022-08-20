import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadmindashboardComponent } from './superadmindashboard.component';

describe('SuperadmindashboardComponent', () => {
  let component: SuperadmindashboardComponent;
  let fixture: ComponentFixture<SuperadmindashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadmindashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
