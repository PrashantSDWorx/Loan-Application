namespace LoanApp.Domain.Exceptions;

public class LoanAlreadyAssessedException : ApplicationException
{
    public LoanAlreadyAssessedException(int loanId): base($"Loan {loanId} Already Assessed!") { }
}
