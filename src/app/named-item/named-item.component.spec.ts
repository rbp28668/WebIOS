import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NamedItemComponent } from './named-item.component';

describe('NamedItemComponent', () => {
  let component: NamedItemComponent;
  let fixture: ComponentFixture<NamedItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
