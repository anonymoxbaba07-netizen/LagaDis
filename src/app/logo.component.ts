import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo" aria-label="Ledgerline">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="10" fill="var(--teal)"/>
        <path d="M10 12h20M10 20h20M10 28h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="30" cy="28" r="3.5" fill="var(--amber)"/>
      </svg>
      <span>Ledgerline</span>
    </div>`,
  styles: [`
    .logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.25rem; letter-spacing: -.02em; }
    .logo.center { justify-content: center; }
  `],
})
export class LogoComponent {}
