import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TugComponent } from './tug.component';

describe('TugComponent', () => {
  let component: TugComponent;
  let fixture: ComponentFixture<TugComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
