import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TochecktokenemailComponent } from './tochecktokenemail.component';

describe('TochecktokenemailComponent', () => {
  let component: TochecktokenemailComponent;
  let fixture: ComponentFixture<TochecktokenemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TochecktokenemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TochecktokenemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
