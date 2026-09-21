using System.ComponentModel.DataAnnotations;

namespace LoanApp.Application.DTOs.Request;

public class CreateLoanApplicationRequest
{
    public required string ApplicantName { get; set; }

    [EmailAddress]
    public required string Email { get; set; }
    [Range(0, Double.MaxValue)]
    public required decimal AnnualIncome { get; set; }
    [Range(0, Double.MaxValue)]
    public required decimal ExistingMonthlyDebt { get; set; }

    [Range(0, 850)]
    public required int CreditScore { get; set; }
    [Range(0, Double.MaxValue)]
    public required decimal LoanAmount { get; set; }
    [Range(0, Double.MaxValue)]
    public required int TermMonths { get; set; }
};
