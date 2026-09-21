namespace LoanApp.Application.DTOs.Response
{
    public record RepaymentScheduleResponse
    (
        decimal InterestRate,
        decimal MonthlyRepayment,
        decimal TotalRepayment,
        IEnumerable<RepaymentEntryResponse> Entries
    );
}
