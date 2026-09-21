import { LoanStatus } from "../enums/loan-status.enum";

export interface LoanApplication {
    id: number;
    applicantName: string;
    email: string;
    loanAmount: number;
    termMonths: number;
    status: LoanStatus;
    rejectionReason?: string;
    appliedAt: string;
}