using LoanApp.Application.Contracts.Services;
using LoanApp.Application.Implementations.Services;
using LoanApp.Domain.Contracts.Repositories;
using LoanApp.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace LoanApp.Infrastructure.Configuration;

public static class ServiceCollectionExtension
{
    public static void RegisterServices(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<ILoanApplicationService, LoanApplicationService>();
        serviceCollection.AddTransient<ILoanAssessmentService, LoanAssessmentService>();
        serviceCollection.AddTransient<ILoanRepaymentService, LoanRepaymentService>();
    }

    public static void RegisterRepositories(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ILoanApplicationRepository, LoanApplicationRepository>();
        serviceCollection.AddScoped<ILoanRepaymentRepository, LoanRepaymentRepository>();
    }
}
