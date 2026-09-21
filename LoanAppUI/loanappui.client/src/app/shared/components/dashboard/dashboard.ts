import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { LoanApplicationModal } from '../../../features/loan-applications/containers/loan-application-modal/loan-application-modal';
import { LoanDetails } from '../../../features/loan-applications/containers/loan-details/loan-details';
import { LoanTable } from '../../../features/loan-applications/containers/loan-table/loan-table';
import { LoanStats } from '../../../features/loan-applications/containers/loan-stats/loan-stats';
import { RepaymentList } from '../../../features/repayment-schedules/containers/repayment-list/repayment-list';
import { ScrollSnapSection } from '../scroll-snap-section/scroll-snap-section';
import { RouterOutlet } from '@angular/router';
import { LoanApplicationStore } from '../../../features/loan-applications/stores/loan-application-store';

@Component({
    selector: 'app-dashboard',
    imports: [ScrollSnapSection, LoanTable, LoanStats, LoanDetails, RepaymentList, LoanApplicationModal],
    host: {
        class: 'd-flex flex-column flex-grow-1 min-h-0'
    },
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
    providers: [LoanApplicationStore]
})
export class DashboardComponent {
    protected readonly loanApplicationStore = inject(LoanApplicationStore);

    @ViewChild('scrollContainer')
    private readonly scrollContainer?: ElementRef<HTMLElement>;

    @ViewChild(LoanApplicationModal)
    private readonly loanApplicationModal?: LoanApplicationModal;

    protected scrollToTop(): void {
        this.scrollContainer?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    }

    protected scrollToDetails(): void {
        this.scrollContainer?.nativeElement.scrollTo({
            top: this.scrollContainer.nativeElement.clientHeight,
            behavior: 'smooth'
        });
    }
}
