import { computed, Directive, input } from '@angular/core';

@Directive({
    selector: '[appInvalidField]',
    standalone: true,
    host: {
        '[class.is-invalid]': 'isInvalid()',
    },
})
export class InvalidFormFieldDirective {
    public readonly appInvalidField = input<boolean | null | undefined>(false);
    public readonly isInvalid = computed(() => !!this.appInvalidField());
}
