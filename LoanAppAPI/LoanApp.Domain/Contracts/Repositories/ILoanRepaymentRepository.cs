using LoanApp.Domain.Entities;

namespace LoanApp.Domain.Contracts.Repositories;
public interface ILoanRepaymentRepository
{
    Task<RepaymentSchedule> GetByLoanId(int id);
    Task Create(RepaymentSchedule schedule);
    Task Update(RepaymentSchedule schedule);
    Task Delete(int id);
}
