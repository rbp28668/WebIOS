import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlightViewComponent } from './flight-view.component';

describe('FlightViewComponent', () => {
  let component: FlightViewComponent;
  let fixture: ComponentFixture<FlightViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
