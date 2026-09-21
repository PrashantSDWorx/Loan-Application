import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { LoanApplication } from '../../../loan-applications/types/models/loan-application';
import { RepaymentScheduleService } from '../../services/repayment-schedule.service';
import { RepaymentInstallmentStatusDirective } from '../../../../shared/directives/repayment-installment-status.directive';
import { RepaymentSchedule } from '../../types/models/repayment-schedule';

@Component({
  selector: 'app-repayment-list',
  imports: [CurrencyPipe, DatePipe, RepaymentInstallmentStatusDirective],
  templateUrl: "./repayment-list.html",
  styleUrl: './repayment-list.scss',
})
export class RepaymentList {
  private readonly repaymentScheduleService = inject(RepaymentScheduleService);

  public readonly loanApplication = input<LoanApplication | null>(null);

  protected readonly repaymentSchedule = signal<RepaymentSchedule>({
    interestRate: 0,
    monthlyRepayment: 0,
    totalRepayment: 0,
    entries: []
  });

  constructor() {
    effect(() => {
      const loanApplication = this.loanApplication();

      if (!loanApplication?.id || loanApplication.status !== 'Approved') {
        this.repaymentSchedule.set({
          interestRate: 0,
          monthlyRepayment: 0,
          totalRepayment: 0,
          entries: []
        });

        return;
      }

      this.getRepaymentSchedule(loanApplication.id);
    });
  }

  protected getRepaymentSchedule(loanId: number) {
    this.repaymentScheduleService.getByLoanId(loanId).subscribe({
      next: (data) => {
        this.repaymentSchedule.set(data);
      }
    });
  }

  protected payInstallment(entryId: number): void {
    const loanApplication = this.loanApplication();

    if (!loanApplication?.id) {
      return;
    }

    this.repaymentScheduleService.payLoanRepaymentInstallment(loanApplication.id, entryId).subscribe({
      next: () => {
        this.getRepaymentSchedule(loanApplication.id);
      },
      error: (error) => {
        console.error('Failed to pay installment', error);
      }
    });
  }
}
