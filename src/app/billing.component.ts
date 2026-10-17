import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { BillingService } from './billing.service';
import { LogoComponent } from './logo.component';

type Invoice = { id: string; date: string; amount: number; status: 'Paid' | 'Due' };

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, LogoComponent],
  template: `
  <header class="bar">
    <app-logo />
    <div class="who">
      <span>{{ auth.user()?.email }}</span>
      <button class="btn ghost" (click)="auth.expire()" title="Demo: sends you to the re-login page">Simulate timeout</button>
      <button class="btn ghost" (click)="auth.logout()">Sign out</button>
    </div>
  </header>

  <main class="wrap">
    <h1>Billing</h1>

    <div class="grid">
      <section class="box">
        <h2>Current plan</h2>
        <p class="big">Team <small>{{ 49 | currency }}/month</small></p>
        <p class="muted">Renews on {{ renewal | date:'d MMMM y' }}</p>
        <button class="btn ghost">Change plan</button>
      </section>

      <section class="box">
        <h2>Payment method</h2>
        <p class="big">{{ billing.card().brand }} ending {{ billing.card().last4 }}</p>
        <p class="muted">Expires {{ billing.card().expiry }}</p>
        <a class="btn ghost" routerLink="/billing/update-card">Update card</a>
      </section>
    </div>

    <section class="box">
      <h2>Invoices</h2>
      <div class="scroll">
        <table>
          <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            @for (i of invoices; track i.id) {
              <tr>
                <td>{{ i.id }}</td>
                <td>{{ i.date | date:'d MMM y' }}</td>
                <td>{{ i.amount | currency }}</td>
                <td><span class="tag" [class.due]="i.status === 'Due'">{{ i.status }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  </main>`,
  styles: [`
    .bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
           padding: 14px 24px; border-bottom: 1px solid var(--line); background: var(--card); }
    .who { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; color: var(--muted); font-size: .9rem; }
    .wrap { max-width: 880px; margin: 0 auto; padding: 32px 24px 64px; }
    h1 { font-size: 2rem; letter-spacing: -.02em; margin: 0 0 24px; }
    h2 { font-size: 1rem; margin: 0 0 12px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 16px; }
    .box { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 20px; }
    a.btn { display: inline-block; text-decoration: none; text-align: center; }
    .big { font-size: 1.4rem; font-weight: 700; margin: 0; }
    .big small { font-size: .95rem; font-weight: 400; color: var(--muted); }
    .muted { color: var(--muted); margin: 4px 0 16px; }
    .scroll { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; min-width: 440px; }
    th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid var(--line); }
    th { color: var(--muted); font-weight: 500; font-size: .9rem; }
    .tag { padding: 2px 10px; border-radius: 99px; font-size: .85rem; background: color-mix(in srgb, var(--teal) 18%, transparent); color: var(--teal-dark); }
    .tag.due { background: color-mix(in srgb, var(--amber) 28%, transparent); color: var(--ink); }
  `],
})
export class BillingComponent {
  auth = inject(AuthService);
  billing = inject(BillingService);
  renewal = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
  invoices: Invoice[] = [
    { id: 'INV-1042', date: '2026-10-01', amount: 49, status: 'Due' },
    { id: 'INV-1031', date: '2026-09-01', amount: 49, status: 'Paid' },
    { id: 'INV-1019', date: '2026-08-01', amount: 49, status: 'Paid' },
    { id: 'INV-1004', date: '2026-07-01', amount: 49, status: 'Paid' },
  ];
}
