namespace LoanApp.Application.DTOs.Response;

public record LoanApplicationStatisticsResponse
(
    int TotalApplications,
    double ApprovalRate,
    decimal AverageLoanAmountApproved,
    decimal TotalLoanAmountApproved
);
