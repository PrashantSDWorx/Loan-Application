using LoanApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoanApp.Infrastructure;

public class LoanApplicationDBContext : DbContext
{
    public DbSet<LoanApplication> LoanApplications { get; set; }
    public DbSet<RepaymentSchedule> RepaymentSchedules { get; set; }
    public DbSet<RepaymentEntry> RepaymentEntries { get; set; }

    public LoanApplicationDBContext(DbContextOptions<LoanApplicationDBContext> dbContextOptions) : base(dbContextOptions) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RepaymentSchedule>()
            .HasMany(s => s.Entries)
            .WithOne()
            .HasForeignKey(e => e.RepaymentScheduleId)
            .OnDelete(DeleteBehavior.Cascade);
        
    }

}
