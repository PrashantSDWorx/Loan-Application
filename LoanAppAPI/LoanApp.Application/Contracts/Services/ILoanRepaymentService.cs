using LoanApp.Domain.Entities;
using LoanApp.Application.DTOs.Response;

namespace LoanApp.Application.Contracts.Services
{
    public interface ILoanRepaymentService
    {
        Task<RepaymentScheduleResponse> GetRepaymentSchedule(int loanId);
        Task<IEnumerable<RepaymentEntryResponse>> GetAllUnpaidRepaymentInstallments(int loanId);
        Task PayRepaymentInstallment(int loanId, int installmentId);
    }
}
