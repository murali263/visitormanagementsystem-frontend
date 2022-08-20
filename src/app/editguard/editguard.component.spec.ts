import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditguardComponent } from './editguard.component';

describe('EditguardComponent', () => {
  let component: EditguardComponent;
  let fixture: ComponentFixture<EditguardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditguardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
