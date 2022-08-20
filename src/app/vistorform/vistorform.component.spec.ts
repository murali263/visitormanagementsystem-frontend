import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistorformComponent } from './vistorform.component';

describe('VistorformComponent', () => {
  let component: VistorformComponent;
  let fixture: ComponentFixture<VistorformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistorformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
