using LoanApp.Application.DTOs.Request;
using LoanApp.Application.DTOs.Response;

namespace LoanApp.Application.Contracts.Services
{
    /*
     * In terms of business logic, this service will deal only with the management of loan applications,
     * including creating new applications, retrieving existing applications, and potentially updating
     * or deleting them in the future.
     * 
     * It will limit its scope only to that and not be concerned with assessing the applications,
     * managing approved loans and their repayments, or loan application statistics, since to a domain expert
     * (business user in this context), they are different modules.
     */
    public interface ILoanApplicationService
    {
        Task<IEnumerable<LoanApplicationResponse>> GetLoanApplications();
        Task<IEnumerable<LoanApplicationResponse>> GetLoanApplicationsByApplicantEmail(string applicantEmail);
        Task<LoanApplicationStatisticsResponse> GetLoanApplicationStatistics();
        Task<LoanApplicationResponse> GetLoanApplicationById(int Id);
        Task<LoanApplicationResponse> CreateLoanApplication(CreateLoanApplicationRequest dto);
    }
}
