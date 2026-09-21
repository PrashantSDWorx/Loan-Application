using LoanApp.Domain.ValueObjects;
using LoanApp.Domain.Entities;

namespace LoanApp.Domain.Contracts.Repositories;
public interface ILoanApplicationRepository
{
    Task<LoanApplication> GetById(int Id);
    Task<IEnumerable<LoanApplication>> GetByApplicantEmail(string applicantEmail);
    Task<IEnumerable<LoanApplication>> GetAll();
    Task<LoanApplicationStatistics> GetStatistics();
    Task Create(LoanApplication loanApplication);
    Task Update(LoanApplication loanApplication);
    Task Delete(int id);
}
