namespace LoanApp.Application.DTOs.Response
{
    public record AssessmentResultResponse
    (
        string Status,
        string? CreditBand,
        decimal? InterestRate,
        decimal? MonthlyRepayment,
        decimal? TotalRepayment,
        string? RejectionReason
    );
}
