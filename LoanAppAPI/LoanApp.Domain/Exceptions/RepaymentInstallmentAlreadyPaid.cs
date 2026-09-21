namespace LoanApp.Domain.Exceptions;

public class RepaymentInstallmentAlreadyPaid : ApplicationException
{
    public RepaymentInstallmentAlreadyPaid(int installmentNumber) : base($"Repayment Installment {installmentNumber} Already Paid!") { }
}
