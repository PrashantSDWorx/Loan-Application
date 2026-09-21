using LoanApp.Domain.Entities;
using LoanApp.Domain.Enums;
using LoanApp.Domain.Contracts.Repositories;
using LoanApp.Application.DTOs.Response;
using LoanApp.Application.DTOs.Request;
using LoanApp.Application.Contracts.Services;

namespace LoanApp.Application.Implementations.Services
{
    public class LoanApplicationService(ILoanApplicationRepository loanRepository) : ILoanApplicationService
    {
        public async Task<LoanApplicationResponse> CreateLoanApplication(CreateLoanApplicationRequest dto)
        {
            var loanApplication = new LoanApplication
            {
                ApplicantName = dto.ApplicantName,
                Email = dto.Email,
                AnnualIncome = dto.AnnualIncome,
                ExistingMonthlyDebt = dto.ExistingMonthlyDebt,
                CreditScore = dto.CreditScore,
                LoanAmount = dto.LoanAmount,
                TermMonths = dto.TermMonths,
                Status = LoanStatus.Pending,
                AppliedAt = DateTime.Now,
            };
            await loanRepository.Create(loanApplication);

            return new LoanApplicationResponse
            (
                loanApplication.Id,
                loanApplication.ApplicantName,
                loanApplication.Email,
                loanApplication.LoanAmount,
                loanApplication.TermMonths,
                loanApplication.Status.ToString(),
                loanApplication.RejectionReason,
                loanApplication.AppliedAt
            );
        }

        public async Task<LoanApplicationResponse> GetLoanApplicationById(int loanId)
        {
            var loanApplication = await loanRepository.GetById(loanId);

            return new LoanApplicationResponse(
                loanApplication.Id,
                loanApplication.ApplicantName,
                loanApplication.Email,
                loanApplication.LoanAmount,
                loanApplication.TermMonths,
                loanApplication.Status.ToString(),
                loanApplication.RejectionReason,
                loanApplication.AppliedAt
            );
        }

        public async Task<IEnumerable<LoanApplicationResponse>> GetLoanApplications()
        {
            var loanApplications = await loanRepository.GetAll();
            return loanApplications.Select(loanApplication => new LoanApplicationResponse
            (
                loanApplication.Id,
                loanApplication.ApplicantName,
                loanApplication.Email,
                loanApplication.LoanAmount,
                loanApplication.TermMonths,
                loanApplication.Status.ToString(),
                loanApplication.RejectionReason,
                loanApplication.AppliedAt
            )).ToList();
        }

        public async Task<IEnumerable<LoanApplicationResponse>> GetLoanApplicationsByApplicantEmail(string applicantEmail)
        {
            var applicantLoanApplications = await loanRepository.GetByApplicantEmail(applicantEmail);
            return applicantLoanApplications.Select(loanApplication => new LoanApplicationResponse
            (
                loanApplication.Id,
                loanApplication.ApplicantName,
                loanApplication.Email,
                loanApplication.LoanAmount,
                loanApplication.TermMonths,
                loanApplication.Status.ToString(),
                loanApplication.RejectionReason,
                loanApplication.AppliedAt
            )).ToList();
        }

        public async Task<LoanApplicationStatisticsResponse> GetLoanApplicationStatistics()
        {
            var loanStatistics = await loanRepository.GetStatistics();
            return new LoanApplicationStatisticsResponse(
                    loanStatistics.Total,
                    loanStatistics.ApprovalRate,
                    loanStatistics.AverageApprovedAmount,
                    loanStatistics.TotalApprovedAmount
                );
        }
    }
}
