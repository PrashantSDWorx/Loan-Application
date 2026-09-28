import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ScrollSection } from '../../components/scroll-section/scroll-section';
import { LoanTable } from '../../../loan-applications/containers/loan-table/loan-table';
import { LoanStats } from '../../../loan-applications/containers/loan-stats-card/loan-stats';
import { LoanDetails } from '../../../loan-applications/containers/loan-details-card/loan-details';
import { RepaymentList } from '../../../repayment-schedules/containers/repayment-list/repayment-list';
import { LoanApplicationModal } from '../../../loan-applications/containers/loan-application-modal/loan-application-modal';
import { LoanApplicationStore } from '../../../loan-applications/services/loan-application-store';

@Component({
    selector: 'app-dashboard',
    imports: [ScrollSection, LoanTable, LoanStats, LoanDetails, RepaymentList, LoanApplicationModal],
    host: {
        class: 'd-flex flex-column flex-grow-1 min-h-0'
    },
    templateUrl: './dashboard-page.html',
    styleUrl: './dashboard-page.scss',
    providers: [LoanApplicationStore]
})
export class DashboardPage {
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
