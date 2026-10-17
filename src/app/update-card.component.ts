import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BillingService } from './billing.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-update-card',
  standalone: true,
  imports: [FormsModule, RouterLink, LogoComponent],
  template: `
  <main class="shell">
    <section class="panel">
      <app-logo />
      <h1>Update card</h1>
      <p class="sub">This card will be used for your next invoice.</p>
      <form (ngSubmit)="save()">
        <label for="name">Name on card</label>
        <input id="name" name="name" autocomplete="cc-name" required [(ngModel)]="name">
        <label for="num">Card number</label>
        <input id="num" name="num" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" required [(ngModel)]="number">
        <div class="row">
          <div><label for="exp">Expiry (MM/YY)</label>
            <input id="exp" name="exp" autocomplete="cc-exp" placeholder="08/29" required [(ngModel)]="expiry"></div>
          <div><label for="cvc">CVC</label>
            <input id="cvc" name="cvc" inputmode="numeric" autocomplete="cc-csc" required [(ngModel)]="cvc"></div>
        </div>
        @if (error) { <p class="error" role="alert">{{ error }}</p> }
        <button class="btn" type="submit">Save card</button>
      </form>
      <p class="sub" style="margin:16px 0 0"><a class="link" routerLink="/billing">Cancel and go back to billing</a></p>
    </section>
  </main>`,
  styles: [`.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }`],
})
export class UpdateCardComponent {
  private billing = inject(BillingService);
  private router = inject(Router);
  name = ''; number = ''; expiry = ''; cvc = ''; error = '';

  save() {
    const digits = this.number.replace(/\s/g, '');
    if (!this.name.trim()) return this.fail('Enter the name on the card.');
    if (!/^\d{13,19}$/.test(digits)) return this.fail('Enter a card number with 13 to 19 digits.');
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiry)) return this.fail('Enter the expiry as MM/YY.');
    if (!/^\d{3,4}$/.test(this.cvc)) return this.fail('Enter the 3 or 4 digit CVC.');
    // Demo only: send card data to your payment provider (e.g. Stripe), never store it yourself.
    const brand = digits.startsWith('4') ? 'Visa' : digits.startsWith('5') ? 'Mastercard' : 'Card';
    this.billing.card.set({ brand, last4: digits.slice(-4), expiry: this.expiry });
    this.router.navigate(['/billing']);
  }

  private fail(m: string) { this.error = m; }
}
