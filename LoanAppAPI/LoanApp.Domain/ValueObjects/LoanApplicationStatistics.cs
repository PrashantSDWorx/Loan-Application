namespace LoanApp.Domain.ValueObjects;

public record LoanApplicationStatistics(
        int Total,
        double ApprovalRate,
        decimal AverageApprovedAmount,
        decimal TotalApprovedAmount
    );

