using LoanApp.Domain.Entities;
using LoanApp.Domain.Exceptions;
using LoanApp.Domain.Contracts.Repositories;
using LoanApp.Domain.Enums;
using LoanApp.Application.DTOs.Response;
using LoanApp.Application.Contracts.Services;

namespace LoanApp.Application.Implementations.Services;

public class LoanAssessmentService(
    ILoanApplicationRepository loanApplicationRepository,
    ILoanRepaymentRepository loanRepaymentRepository) : ILoanAssessmentService
{
    public async Task<AssessmentResultResponse> AssessLoanApplication(int loanId)
    {
        var loanApplication = await loanApplicationRepository.GetById(loanId);

        if (loanApplication.Status == LoanStatus.Approved || loanApplication.Status == LoanStatus.Rejected)
            throw new LoanAlreadyAssessedException(loanId);

        var creditBand = GetCreditBand(loanApplication.CreditScore);
        if (creditBand != CreditBand.Poor)
        {
            var annualInterestRate = DetermineInterestRate(creditBand);
            var monthlyRepayment = CalculateMonthlyRepayment(
                loanApplication.LoanAmount,
                annualInterestRate,
                loanApplication.TermMonths
            );

            if (DetermineAffordability(loanApplication.AnnualIncome / 12, loanApplication.ExistingMonthlyDebt, monthlyRepayment))
            {
                await ApproveLoanApplication(loanId, annualInterestRate, monthlyRepayment, loanApplication.TermMonths);
                return new AssessmentResultResponse(
                        loanApplication.Status.ToString(),
                        creditBand.ToString(),
                        annualInterestRate,
                        monthlyRepayment,
                        loanApplication.LoanAmount,
                        null
                );
            }
        }

        var rejectionReason =
            creditBand == CreditBand.Poor ?
            "Rejection Reason: Poor Credit Band!" :
            "Rejection Reason: Applicant Cannot Afford Loan!";
        await RejectLoanApplication(loanId, rejectionReason);
        return new AssessmentResultResponse(
                    loanApplication.Status.ToString(),
                    creditBand.ToString(),
                    0m,
                    0m,
                    loanApplication.LoanAmount,
                    rejectionReason
        );
    }

    private static CreditBand GetCreditBand(int creditScore)
    {
        if (creditScore >= 750 && creditScore <= 850)
        {
            return CreditBand.Excellent;
        }
        else if (creditScore >= 650 && creditScore <= 749)
        {
            return CreditBand.Good;
        }
        else if (creditScore >= 550 && creditScore <= 649)
        {
            return CreditBand.Fair;
        }
        else if (creditScore >= 0 && creditScore <= 549)
        {
            return CreditBand.Poor;
        }

        throw new Exception("Invalid Credit Score!");
    }

    private static decimal DetermineInterestRate(CreditBand creditBand)
    {
        switch (creditBand)
        {
            case CreditBand.Excellent:
                return 0.04m;
            case CreditBand.Good:
                return 0.07m;
            case CreditBand.Fair:
                return 0.12m;
            default:
                throw new Exception("Interest Rate Not Available For Poor Credit Band!");
        }
    }

    private static decimal CalculateMonthlyRepayment(decimal principal, decimal annualInterestRate, int termMonths)
    {
        if (termMonths == 0 || annualInterestRate == 0 || termMonths == 0)
            throw new Exception("Params Cannot Be 0!");

        var monthlyRate = (double)(annualInterestRate / 12m);
        var monthlyRatePowN = Math.Pow(1 + monthlyRate, termMonths);
        var repayment =
            (double)principal * (monthlyRate * monthlyRatePowN / (monthlyRatePowN - 1));

        return decimal.Round((decimal)repayment, 2);
    }


    private static bool DetermineAffordability(decimal monthlyIncome, decimal existingMonthlyDebt, decimal monthlyRepayment)
    {
        if ((existingMonthlyDebt + monthlyRepayment) >= monthlyIncome * 0.35m)
            return false;
        return true;
    }

    public async Task ApproveLoanApplication(
        int loanId, decimal interestRate, decimal monthlyRepayment, int termMonths)
    {
        var loanApplication = await loanApplicationRepository.GetById(loanId);

        loanApplication.Status = LoanStatus.Approved;

        await loanApplicationRepository.Update(loanApplication);

        var totalRepayable = monthlyRepayment * termMonths;
        var approvalDate = DateTime.Now;
        var repaymentSchedule = new RepaymentSchedule
        {
            LoanApplicationId = loanId,
            InterestRate = interestRate,
            MonthlyRepayment = monthlyRepayment,
            TotalRepayable = totalRepayable
        };
        await loanRepaymentRepository.Create(repaymentSchedule);
        for (int installmentNumber = 1; installmentNumber <= termMonths; installmentNumber++)
        {
            repaymentSchedule.Entries.Add(new RepaymentEntry
            {
                RepaymentScheduleId = repaymentSchedule.Id,
                InstallmentNumber = installmentNumber,
                DueDate = approvalDate.AddMonths(installmentNumber),
                Amount = monthlyRepayment,
                IsPaid = false,
            });
        }
        await loanRepaymentRepository.Update(repaymentSchedule);
    }

    public async Task RejectLoanApplication(int loanId, string reason)
    {
        var loanApplication = await loanApplicationRepository.GetById(loanId);

        loanApplication.Status = LoanStatus.Rejected;
        loanApplication.RejectionReason = reason;

        await loanApplicationRepository.Update(loanApplication);

    }
}
