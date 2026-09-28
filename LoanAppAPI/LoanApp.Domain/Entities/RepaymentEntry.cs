namespace LoanApp.Domain.Entities
{
    /*
     * RepaymentEntry represents a single installment in the repayment schedule of a loan.
     * It can either be paid or unpaid, and contains information about the installment number, due date, and amount.
     */
    public class RepaymentEntry
    {
        public int Id { get; set; }
        public int RepaymentScheduleId { get; set; }
        public int InstallmentNumber { get; set; } // 1 to TermMonths
        public DateTime DueDate { get; set; }
        public decimal Amount { get; set; }
        public bool IsPaid { get; set; }
    }
}
