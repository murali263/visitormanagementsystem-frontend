import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotlistedvisitorsComponent } from './notlistedvisitors.component';

describe('NotlistedvisitorsComponent', () => {
  let component: NotlistedvisitorsComponent;
  let fixture: ComponentFixture<NotlistedvisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotlistedvisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotlistedvisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
