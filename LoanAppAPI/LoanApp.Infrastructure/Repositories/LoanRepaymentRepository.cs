using LoanApp.Domain.Contracts.Repositories;
using LoanApp.Domain.Entities;
using LoanApp.Infrastructure;
using LoanApp.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace LoanApp.Infrastructure.Repositories;

public class LoanRepaymentRepository(LoanApplicationDBContext dbContext) : ILoanRepaymentRepository
{
    public async Task Create(RepaymentSchedule schedule)
    {
        await dbContext.RepaymentSchedules.AddAsync(schedule);
        await dbContext.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        await dbContext.LoanApplications.Where(loan => loan.Id == id).ExecuteDeleteAsync();
    }

    public async Task<RepaymentSchedule> GetByLoanId(int Id)
    {
        var rs = await dbContext.RepaymentSchedules.ToListAsync();

        return await dbContext.RepaymentSchedules
            .Include(s => s.Entries)
            .FirstOrDefaultAsync(repaymentSchedule => repaymentSchedule.LoanApplicationId == Id)
            ?? throw new RepaymentScheduleNotFoundException(Id);
    }

    public async Task Update(RepaymentSchedule schedule)
    {
        await dbContext.SaveChangesAsync();
    }
}
