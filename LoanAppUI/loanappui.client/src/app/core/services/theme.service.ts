import { Injectable, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly storageKey = 'loanapp-theme';

    readonly theme = signal<ThemeMode>(this.getInitialTheme());

    constructor() {
        effect(() => {
            const theme = this.theme();
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(this.storageKey, theme);
        });
    }

    toggleTheme(): void {
        this.theme.update(current => (current === 'light' ? 'dark' : 'light'));
    }

    private getInitialTheme(): ThemeMode {
        const storedTheme = localStorage.getItem(this.storageKey);
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}
