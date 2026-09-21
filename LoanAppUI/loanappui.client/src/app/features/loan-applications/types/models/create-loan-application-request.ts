export interface CreateLoanApplicationRequest {
    applicantName: string;
    email: string;
    annualIncome: number;
    existingMonthlyDebt: number;
    creditScore: number;
    loanAmount: number;
    termMonths: number;
}