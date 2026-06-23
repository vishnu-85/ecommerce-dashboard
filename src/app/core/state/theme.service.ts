import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Primary Signal for global state
  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    // Enterprise Pattern: Use effect() to synchronize Signal state with DOM side-effects
    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
  }
}