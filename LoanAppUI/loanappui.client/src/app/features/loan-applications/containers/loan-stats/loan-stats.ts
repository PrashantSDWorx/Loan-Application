import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoanApplicationStore } from '../../stores/loan-application-store';

@Component({
  imports: [CurrencyPipe, DecimalPipe],
  selector: 'app-loan-stats',
  styleUrl: './loan-stats.css',
  templateUrl: './loan-stats.html',
})
export class LoanStats {
  private readonly store = inject(LoanApplicationStore);
  protected readonly statistics = this.store.statistics;

  constructor() {
    this.store.loadStatistics();
  }
}
