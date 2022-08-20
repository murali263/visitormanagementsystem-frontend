import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardListComponent } from './guard-list.component';

describe('GuardListComponent', () => {
  let component: GuardListComponent;
  let fixture: ComponentFixture<GuardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
