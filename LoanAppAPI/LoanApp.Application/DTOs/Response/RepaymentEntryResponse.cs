namespace LoanApp.Application.DTOs.Response
{
    public record RepaymentEntryResponse
    (
        int InstallmentNumber,
        DateTime DueDate,
        decimal Amount,
        bool IsPaid
    );
}
