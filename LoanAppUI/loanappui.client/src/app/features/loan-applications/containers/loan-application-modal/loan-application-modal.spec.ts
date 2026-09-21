import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanApplicationModal } from './loan-application-modal';

describe('LoanApplicationForm', () => {
  let component: LoanApplicationModal;
  let fixture: ComponentFixture<LoanApplicationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplicationModal],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanApplicationModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require termMonths to be a multiple of 12', () => {
    const termControl = component.loanApplicationForm.controls.termMonths;

    termControl.setValue(18);

    expect(termControl.hasError('multipleOf12')).toBeTrue();
    expect(component.loanApplicationForm.invalid).toBeTrue();
  });
});
