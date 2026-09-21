namespace LoanApp.Domain.Exceptions;

public class LoanNotFoundException : ApplicationException
{
       public LoanNotFoundException(int loanId) : base($"Loan Application {loanId} Not Found!") { }
}
