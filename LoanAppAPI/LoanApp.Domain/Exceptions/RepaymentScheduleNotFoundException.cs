namespace LoanApp.Domain.Exceptions;

public class RepaymentScheduleNotFoundException : ApplicationException
{
       public RepaymentScheduleNotFoundException(int loanId) : base($"Repayment Schedule for Loan {loanId} Not Found!") { }
}
