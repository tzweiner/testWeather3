import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeForecastComponent } from './range-forecast.component';

describe('RangeForecastComponent', () => {
  let component: RangeForecastComponent;
  let fixture: ComponentFixture<RangeForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RangeForecastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RangeForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
