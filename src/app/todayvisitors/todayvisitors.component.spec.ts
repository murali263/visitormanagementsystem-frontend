import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayvisitorsComponent } from './todayvisitors.component';

describe('TodayvisitorsComponent', () => {
  let component: TodayvisitorsComponent;
  let fixture: ComponentFixture<TodayvisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayvisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayvisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
