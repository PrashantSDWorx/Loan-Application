import { Component, inject, output } from '@angular/core';
import { LoanApplication } from '../../types/models/loan-application';
import { LoanStatus } from '../../types/enums/loan-status.enum';
import { LoanApplicationStore } from '../../stores/loan-application-store';

@Component({
    imports: [],
    selector: 'app-loan-table',
    styleUrl: './loan-table.scss',
    templateUrl: './loan-table.html',
})
export class LoanTable {
    protected readonly store = inject(LoanApplicationStore);

    public readonly loanSelectEvent = output<void>();
    public readonly createButtonClickEvent = output<void>();

    constructor() {
        this.store.loadApplications();
    }

    protected getStatusClass(status: LoanStatus): string {
        switch (status) {
            case LoanStatus.Approved:
                return 'bg-success-subtle text-success-emphasis';
            case LoanStatus.Rejected:
                return 'bg-danger-subtle text-danger-emphasis';
            default:
                return 'bg-warning-subtle text-warning-emphasis';
        }
    }

    protected selectLoanApplication(loanApplication: LoanApplication) {
        this.store.selectLoan(loanApplication.id);
        this.loanSelectEvent.emit();
    }
}
