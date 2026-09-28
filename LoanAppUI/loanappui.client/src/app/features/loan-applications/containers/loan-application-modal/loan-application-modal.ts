import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InvalidFormFieldDirective } from '../../../../shared/directives/invalid-form-field.directive';
import { CreateLoanApplicationRequest } from '../../types/models/create-loan-application-request';
import { LoanApplicationStore } from '../../services/loan-application-store';

function multipleOf12Validator(control: AbstractControl<number | null>): ValidationErrors | null {
  const value = control.value;

  if (value == null) {
    return null;
  }

  const isMultipleOf12 = Number.isInteger(value) && value > 0 && value % 12 === 0;

  return isMultipleOf12 ? null : { multipleOf12: true };
}

@Component({
  imports: [ReactiveFormsModule, InvalidFormFieldDirective],
  selector: 'app-loan-application-modal',
  styleUrl: './loan-application-modal.css',
  templateUrl: './loan-application-modal.html',
})
export class LoanApplicationModal {
  private readonly store = inject(LoanApplicationStore);
  protected readonly isOpen = signal(false);

  protected submissionAttempted = false;

  protected readonly loanApplicationForm = new FormGroup({
    applicantName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    annualIncome: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0)] }),
    existingMonthlyDebt: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0)] }),
    creditScore: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0), Validators.max(850)] }),
    loanAmount: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(0)] }),
    termMonths: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1), multipleOf12Validator] })
  });

  public open(): void {
    this.loanApplicationForm.reset();
    this.submissionAttempted = false;
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
  }

  protected isFieldInvalid(controlName: string): boolean {
    const control = this.loanApplicationForm.get(controlName);

    return !!control && this.submissionAttempted && control.invalid;
  }

  protected getFieldErrorMessage(controlName: string): string {
    const control = this.loanApplicationForm.get(controlName);

    if (!control || !control.errors) {
      return '';
    }

    const label = this.getFieldLabel(controlName);

    if (control.errors['required']) {
      return `${label} is required.`;
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address.';
    }

    if (control.errors['min']) {
      return `${label} must be at least ${control.errors['min'].min}.`;
    }

    if (control.errors['max']) {
      return `${label} must be at most ${control.errors['max'].max}.`;
    }

    if (control.errors['multipleOf12']) {
      return 'Term (months) must be a multiple of 12.';
    }

    return `${label} is invalid.`;
  }

  protected getFieldLabel(controlName: string): string {
    const labels: Record<string, string> = {
      applicantName: 'Applicant name',
      email: 'Email',
      annualIncome: 'Annual income',
      existingMonthlyDebt: 'Existing monthly debt',
      creditScore: 'Credit score',
      loanAmount: 'Loan amount',
      termMonths: 'Term (months)'
    };

    return labels[controlName] ?? 'This field';
  }

  protected onClose(): void {
    this.close();
  }

  protected onSubmit(): void {
    this.submissionAttempted = true;

    if (this.loanApplicationForm.invalid) {
      this.loanApplicationForm.markAllAsTouched();
      return;
    }

    const formValue = this.loanApplicationForm.getRawValue();
    const request: CreateLoanApplicationRequest = {
      applicantName: formValue.applicantName,
      email: formValue.email,
      annualIncome: formValue.annualIncome ?? 0,
      existingMonthlyDebt: formValue.existingMonthlyDebt ?? 0,
      creditScore: formValue.creditScore ?? 0,
      loanAmount: formValue.loanAmount ?? 0,
      termMonths: formValue.termMonths ?? 0
    };

    this.store.createApplication(request);
    this.loanApplicationForm.reset();
    this.close();
  }
}