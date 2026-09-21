export interface LoanAssessment {
    status: string;
    creditBand: string;
    interestRate: number;
    monthlyRepayment: number;
    totalRepayment: number;
    rejectionReason?: string;
};