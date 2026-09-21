using LoanApp.Domain.Enums;

namespace LoanApp.Domain.Entities;
/*
 * LoanApplication represents the draft of a loan application submitted by a user.
 * It contains the applicant's personal and financial information, the requested 
 * loan amount and term, and the current status of the application 
 * (e.g., Pending, Approved, Rejected).
 */
public class LoanApplication
{
    public int Id { get; set; }
    public string ApplicantName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public decimal AnnualIncome { get; set; }
    public decimal ExistingMonthlyDebt { get; set; } // e.g. existing credit card minimums
    public int CreditScore { get; set; } // 300–850
    public decimal LoanAmount { get; set; }
    public int TermMonths { get; set; } // e.g. 12, 24, 36, 60
    public LoanStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public DateTime AppliedAt { get; set; }
}
