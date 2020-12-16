import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SlewComponent } from './slew.component';

describe('SlewComponent', () => {
  let component: SlewComponent;
  let fixture: ComponentFixture<SlewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SlewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
