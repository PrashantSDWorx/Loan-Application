import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { RepaymentEntry } from "../types/models/repayment-entry";
import { RepaymentSchedule } from "../types/models/repayment-schedule";

@Injectable({ providedIn: "root" })
export class RepaymentScheduleService {
    private readonly http = inject(HttpClient);
    private readonly loansBaseUrl = `${environment.apiBaseUrl}/loans`;

    getByLoanId(loanId: number): Observable<RepaymentSchedule> {
        return this.http.get<RepaymentSchedule>(this.getLoanScheduleUrl(loanId));
    }

    getOutstandingInstallmentsByLoanId(loanId: number): Observable<RepaymentEntry[]> {
        return this.http.get<RepaymentEntry[]>(`${this.getLoanScheduleUrl(loanId)}/outstanding`);
    }

    payLoanRepaymentInstallment(loanId: number, entryId: number): Observable<void> {
        return this.http.put<void>(`${this.getLoanScheduleUrl(loanId)}/entries/${entryId}/pay`, {});
    }

    private getLoanScheduleUrl(loanId: number): string {
        return `${this.loansBaseUrl}/${loanId}/schedule`;
    }
}