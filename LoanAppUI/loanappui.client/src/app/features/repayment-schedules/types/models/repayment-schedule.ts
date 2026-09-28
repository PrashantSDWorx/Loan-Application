import { RepaymentEntry } from "./repayment-entry";

export interface RepaymentSchedule {
    interestRate: number;
    monthlyRepayment: number;
    totalRepayment: number;
    entries: RepaymentEntry[];
}