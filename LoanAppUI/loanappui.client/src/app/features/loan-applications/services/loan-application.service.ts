import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { BaseService } from "../../../core/services/base.service";
import { CreateLoanApplicationRequest } from "../types/models/create-loan-application-request";
import { LoanApplication } from "../types/models/loan-application";
import { LoanStatistics } from "../types/models/loan-statistics";
import { LoanAssessment } from "../types/models/loan-assessment";
import { Injectable } from "@angular/core";
import { LoanStatus } from "../types/enums/loan-status.enum";

@Injectable({ providedIn: "root" })
export class LoanApplicationService extends BaseService<
    LoanApplication,
    CreateLoanApplicationRequest> {
    protected override readonly resourceUrl = `${environment.apiBaseUrl}/loans`;

    getByApplicantName(applicantName: string): Observable<LoanApplication> {
        return this.http.get<LoanApplication>(`${this.resourceUrl}/applicant/${applicantName}`);
    }

    assessLoanApplication(loanId: number): Observable<LoanAssessment> {
        return this.http.post<LoanAssessment>(`${this.resourceUrl}/${loanId}/assess`, {});
    }

    getStatistics(): Observable<LoanStatistics> {
        return this.http.get<LoanStatistics>(`${this.resourceUrl}/stats`);
    }

    public getPlaceholderLoanApplications(): LoanApplication[] {
        return [
            {
                id: 1,
                applicantName: 'Maya Thompson',
                email: 'maya.thompson@example.com',
                loanAmount: 16000,
                termMonths: 36,
                status: LoanStatus.Pending,
                appliedAt: '2026-08-20T09:30:00'
            },
            {
                id: 2,
                applicantName: 'Daniel Brooks',
                email: 'daniel.brooks@example.com',
                loanAmount: 24500,
                termMonths: 48,
                status: LoanStatus.Approved,
                appliedAt: '2026-08-18T14:15:00'
            },
            {
                id: 3,
                applicantName: 'Sofia Nguyen',
                email: 'sofia.nguyen@example.com',
                loanAmount: 12000,
                termMonths: 24,
                status: LoanStatus.Pending,
                appliedAt: '2026-08-16T11:00:00'
            },
            {
                id: 4,
                applicantName: 'Ethan Rivera',
                email: 'ethan.rivera@example.com',
                loanAmount: 32000,
                termMonths: 60,
                status: LoanStatus.Rejected,
                rejectionReason: 'Insufficient income verification',
                appliedAt: '2026-08-12T08:45:00'
            },
            {
                id: 5,
                applicantName: 'Olivia Patel',
                email: 'olivia.patel@example.com',
                loanAmount: 21000,
                termMonths: 42,
                status: LoanStatus.Approved,
                appliedAt: '2026-08-10T15:20:00'
            }
        ];
    }
}