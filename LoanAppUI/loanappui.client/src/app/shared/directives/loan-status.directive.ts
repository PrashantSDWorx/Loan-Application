import { computed, Directive, input } from '@angular/core';
import { LoanStatus } from '../../features/loan-applications/types/enums/loan-status.enum';

@Directive({
  selector: '[appLoanStatus]',
  host: {
    '[style.background]': 'backgroundColor()',
    '[style.color]': "'var(--app-accent-contrast)'",
  },
})
export class LoanStatusDirective {
  public readonly appLoanStatus = input<string | undefined | null>(LoanStatus.Pending);

  public readonly backgroundColor = computed(() => {
    switch (this.appLoanStatus()) {
      case LoanStatus.Approved:
        return 'var(--bs-brutal-success)';
      case LoanStatus.Pending:
        return 'var(--bs-brutal-warning)';
      case LoanStatus.Rejected:
        return 'var(--bs-brutal-danger)';
      default:
        return 'var(--bs-brutal-warning)';
    }
  });
}
