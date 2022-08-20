import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalvisitorsComponent } from './totalvisitors.component';

describe('TotalvisitorsComponent', () => {
  let component: TotalvisitorsComponent;
  let fixture: ComponentFixture<TotalvisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalvisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalvisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
