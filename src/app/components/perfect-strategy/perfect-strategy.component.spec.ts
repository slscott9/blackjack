import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectStrategyComponent } from './perfect-strategy.component';

describe('PerfectStrategyComponent', () => {
  let component: PerfectStrategyComponent;
  let fixture: ComponentFixture<PerfectStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfectStrategyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfectStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
