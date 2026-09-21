using LoanApp.Application.DTOs.Response;

namespace LoanApp.Application.Contracts.Services
{
    public interface ILoanAssessmentService
    {
        Task<AssessmentResultResponse> AssessLoanApplication(int loanId);
        Task ApproveLoanApplication(int loanId, decimal interestRate, decimal monthlyRepayment, int termMonths);
        Task RejectLoanApplication(int loanId, string reason);
    }
}
