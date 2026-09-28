import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanStats } from './loan-stats';

describe('LoanStats', () => {
  let component: LoanStats;
  let fixture: ComponentFixture<LoanStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanStats],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
