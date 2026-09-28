import { computed, Directive, input } from '@angular/core';

@Directive({
    selector: '[appRepaymentInstallmentStatus]',
    standalone: true,
    host: {
        '[style.background-color]': 'backgroundColor()',
        '[class.is-paid]': 'isPaidState()',
        '[class.is-outstanding]': 'isOutstanding()',
    },
})
export class RepaymentInstallmentStatusDirective {
    public readonly appRepaymentInstallmentStatus = input<boolean | null | undefined>(false);
    public readonly isPaidState = computed(() => !!this.appRepaymentInstallmentStatus());
    public readonly isOutstanding = computed(() => !this.isPaidState());
    public readonly backgroundColor = computed(() =>
        this.isPaidState() ? 'var(--bs-brutal-success)' : 'var(--bs-brutal-white)',
    );
}
