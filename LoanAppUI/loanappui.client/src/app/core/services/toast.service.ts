import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private readonly toasts = signal<Toast[]>([]);
    private nextId = 1;

    readonly toastsSignal = this.toasts.asReadonly();

    show(message: string, type: ToastType = 'info'): void {
        const id = this.nextId++;
        this.toasts.update((current) => [...current, { id, message, type }]);

        setTimeout(() => this.dismiss(id), 5000);
    }

    dismiss(id: number): void {
        this.toasts.update((current) => current.filter((toast) => toast.id !== id));
    }
}
