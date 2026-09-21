import { Component, computed, inject } from '@angular/core';

import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    @if (toasts().length) {
      <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1100;">
        @for (toast of toasts(); track toast.id) {
          <div
            class="toast show card overflow-hidden"
            [style.background-color]="toast.type === 'success'
              ? 'var(--bs-brutal-success)'
              : toast.type === 'error'
                ? 'var(--bs-brutal-danger)'
                : 'var(--bs-brutal-info)'"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header card-header bg-transparent">
              <strong class="me-auto">{{ toast.type }}</strong>
              <button type="button" class="btn-close" aria-label="Close" (click)="dismiss(toast.id)"></button>
            </div>
            <div class="toast-body card-body">
              {{ toast.message }}
            </div>
          </div>
        }
      </div>
    }
  `,
})
export class ToastContainer {
  private readonly toastService = inject(ToastService);

  readonly toasts = computed(() => this.toastService.toastsSignal());

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
