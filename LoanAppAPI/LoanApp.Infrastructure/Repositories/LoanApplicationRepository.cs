using LoanApp.Domain.Contracts.Repositories;
using LoanApp.Domain.Enums;
using LoanApp.Domain.ValueObjects;
using LoanApp.Infrastructure;
using LoanApp.Domain.Entities;
using LoanApp.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LoanApp.Infrastructure.Repositories;

public class LoanApplicationRepository : ILoanApplicationRepository
{
    private readonly LoanApplicationDBContext _dbContext;

    public LoanApplicationRepository(LoanApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task Create(LoanApplication loanApplication)
    {
        await _dbContext.LoanApplications.AddAsync(loanApplication);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        await _dbContext.LoanApplications.Where(loan => loan.Id == id).ExecuteDeleteAsync();
    }

    public async Task<IEnumerable<LoanApplication>> GetAll()
    {
        return await _dbContext.LoanApplications.ToListAsync();
    }

    public async Task<IEnumerable<LoanApplication>> GetByApplicantEmail(string applicantEmail)
    {
        return await _dbContext.LoanApplications.Where(loan => loan.Email.Equals(applicantEmail)).ToListAsync();
    }

    public async Task<LoanApplication> GetById(int Id)
    {
        return await _dbContext.LoanApplications.FirstOrDefaultAsync(loan => loan.Id == Id)
            ?? throw new LoanNotFoundException(Id);
    }

    public async Task<LoanApplicationStatistics> GetStatistics()
    {
        var stats = await _dbContext.LoanApplications
            .GroupBy(loan => 1)
            .Select(g => new
            {
                TotalApplications = g.Count(),
                TotalApprovedApplications = g.Count(l => l.Status == LoanStatus.Approved),
                TotalApprovedLoanAmount = g.Where(l => l.Status == LoanStatus.Approved).Sum(l => (decimal)l.LoanAmount),
            })
            .FirstOrDefaultAsync();

        if (stats == null || stats.TotalApplications == 0)
        {
            return new LoanApplicationStatistics(0, 0.0, 0m, 0m);
        }

        double approvalRate = stats.TotalApprovedApplications == 0
            ? 0.0
            : ((double)stats.TotalApprovedApplications / (double)stats.TotalApplications) * 100.0;

        var averageApprovedLoanAmount = stats.TotalApprovedApplications == 0
            ? 0m
            : stats.TotalApprovedLoanAmount / stats.TotalApprovedApplications;

        return new LoanApplicationStatistics(
            stats.TotalApplications,
            approvalRate,
            averageApprovedLoanAmount,
            stats.TotalApprovedLoanAmount
        );
    }

    public async Task Update(LoanApplication loanApplication)
    {
        await _dbContext.SaveChangesAsync();
    }
}
