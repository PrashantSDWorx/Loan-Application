namespace LoanApp.Domain.Entities
{
    /*
     * RepaymentSchedule represents the full repayment plan for a loan application.
     * It contains the interest rate, monthly repayment amount, total repayable amount,
     * and a list of individual repayment entries (installments).
     * 
     * A repayment schedule is generated when a loan application is approved, and it provides
     * the borrower with a clear outline of their repayment obligations for the duration of the loan term 
     * in months, which becomes the number of entries in the schedule.
     */
    public class RepaymentSchedule
    {
        public int Id { get; set; }
        public int LoanApplicationId { get; set; }
        public decimal InterestRate { get; set; } // e.g. 0.07 for 7%
        public decimal MonthlyRepayment { get; set; }
        public decimal TotalRepayable { get; set; }
        public List<RepaymentEntry> Entries { get; set; } = new List<RepaymentEntry>();

    }
}
