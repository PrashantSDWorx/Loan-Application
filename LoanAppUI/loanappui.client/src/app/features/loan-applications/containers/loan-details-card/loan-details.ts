import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoanStatusDirective } from '../../../../shared/directives/loan-status.directive';
import { LoanApplicationStore } from '../../services/loan-application-store';

@Component({
  selector: 'app-loan-details',
  imports: [DatePipe, LoanStatusDirective],
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.css',
})
export class LoanDetails {
  protected readonly store = inject(LoanApplicationStore);
  protected readonly loanApplication = this.store.selectedLoanApplication;

  protected assessApplication(): void {
    const currentLoanApplication = this.loanApplication();

    if (currentLoanApplication == null) {
      return;
    }

    this.store.assessApplication(currentLoanApplication.id);
  }
}
