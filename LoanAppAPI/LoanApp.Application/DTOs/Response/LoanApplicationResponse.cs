namespace LoanApp.Application.DTOs.Response
{
    public record LoanApplicationResponse
    (
        int Id,
        string ApplicantName,
        string Email,
        decimal LoanAmount,
        int TermMonths,
        string Status,
        string? RejectionReason,
        DateTime AppliedAt
    );
}
