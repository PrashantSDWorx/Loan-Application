using LoanApp.Domain.Exceptions;
using LoanApp.Domain.Contracts.Repositories;
using LoanApp.Application.DTOs.Response;
using LoanApp.Application.Contracts.Services;

namespace LoanApp.Application.Implementations.Services
{
    public class LoanRepaymentService(ILoanRepaymentRepository loanRepaymentRepository) : ILoanRepaymentService
    {
        public async Task<IEnumerable<RepaymentEntryResponse>> GetAllUnpaidRepaymentInstallments(int loanId)
        {
            var repaymentSchedule = await loanRepaymentRepository.GetByLoanId(loanId);
            return repaymentSchedule.Entries
                        .Where(repaymentEntry => !repaymentEntry.IsPaid)
                        .Select(repaymentEntry => new RepaymentEntryResponse
                        (
                            repaymentEntry.InstallmentNumber,
                            repaymentEntry.DueDate,
                            repaymentEntry.Amount,
                            repaymentEntry.IsPaid
                        )
                    );
        }

        public async Task<RepaymentScheduleResponse> GetRepaymentSchedule(int loanId)
        {
            var repaymentSchedule = await loanRepaymentRepository.GetByLoanId(loanId);
            return new RepaymentScheduleResponse(
                repaymentSchedule.InterestRate,
                repaymentSchedule.MonthlyRepayment,
                repaymentSchedule.TotalRepayable,
                repaymentSchedule.Entries.Select(repaymentEntry => new RepaymentEntryResponse(
                    repaymentEntry.InstallmentNumber,
                    repaymentEntry.DueDate,
                    repaymentEntry.Amount,
                    repaymentEntry.IsPaid
                    )
                ));
        }

        public async Task PayRepaymentInstallment(int loanId, int installmentNumber)
        {
            var repaymentSchedule = await loanRepaymentRepository.GetByLoanId(loanId);
            var repaymentEntry = repaymentSchedule.Entries.FirstOrDefault(repaymentEntry => repaymentEntry.InstallmentNumber == installmentNumber);

            if (repaymentEntry == null)
            {
                throw new Exception("No Installment Found!");
            }
            else if (repaymentEntry.IsPaid)
            {
                throw new RepaymentInstallmentAlreadyPaid(loanId);
            }

            repaymentEntry.IsPaid = true;
            await loanRepaymentRepository.Update(repaymentSchedule);
        }
    }
}
