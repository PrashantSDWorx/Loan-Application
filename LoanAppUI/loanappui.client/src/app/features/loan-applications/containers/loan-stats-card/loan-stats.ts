import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { LoanApplicationStore } from '../../services/loan-application-store';
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration } from 'chart.js';

@Component({
  imports: [CurrencyPipe, DecimalPipe, BaseChartDirective],
  selector: 'app-loan-stats',
  styleUrl: './loan-stats.css',
  templateUrl: './loan-stats.html',
})
export class LoanStats {
  protected readonly store = inject(LoanApplicationStore);

  public pieChartData = computed<ChartConfiguration<'pie'>['data']>(() => ({
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [{
      data: [
        this.store.approvedLoanApplications().length,
        this.store.pendingLoanApplications().length,
        this.store.rejectedLoanApplications().length
      ],
      backgroundColor: ['#95E1D3', '#ffd60a', '#ff5d8f'],
      borderColor: '#000',
      borderWidth: 4
    }]
  }));

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };


  constructor() {
    this.store.loadStatistics();
  }
}
