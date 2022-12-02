import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CmdbuttonComponent } from './cmdbutton.component';

describe('CmdbuttonComponent', () => {
  let component: CmdbuttonComponent;
  let fixture: ComponentFixture<CmdbuttonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmdbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
