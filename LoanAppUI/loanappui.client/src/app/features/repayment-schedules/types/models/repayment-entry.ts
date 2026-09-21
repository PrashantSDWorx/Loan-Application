export interface RepaymentEntry {
    installmentNumber: number;
    dueDate: Date;
    amount: number;
    isPaid: boolean;
}