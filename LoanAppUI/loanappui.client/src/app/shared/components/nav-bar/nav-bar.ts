import { Component, inject } from '@angular/core';
import { Logo } from '../logo/logo';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';

enum Page {
  Home,
  Settings
};

@Component({
  imports: [Logo],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);

  protected readonly currentPage = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/dashboard/settings')
        ? Page.Settings : Page.Home),
    ),
    { initialValue: Page.Home }
  );
  protected readonly Page = Page;
  protected readonly isDarkMode = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateSettings() {
    this.router.navigate(['/dashboard/settings']);
  }

  navigateHome() {
    this.router.navigate(['dashboard']);
  }
}
