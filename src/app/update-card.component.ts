import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Address, BillingService } from './billing.service';
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
      <p class="sub">This card and billing address will be used for your next invoice.</p>
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
        <h2>Billing address</h2>
        <label for="l1">Address line 1</label>
        <input id="l1" name="l1" autocomplete="address-line1" required [(ngModel)]="a.line1">
        <label for="l2">Address line 2 <span class="opt">(optional)</span></label>
        <input id="l2" name="l2" autocomplete="address-line2" [(ngModel)]="a.line2">
        <div class="row">
          <div><label for="city">City</label>
            <input id="city" name="city" autocomplete="address-level2" required [(ngModel)]="a.city"></div>
          <div><label for="region">State / region</label>
            <input id="region" name="region" autocomplete="address-level1" required [(ngModel)]="a.region"></div>
        </div>
        <div class="row">
          <div><label for="zip">Postal code</label>
            <input id="zip" name="zip" autocomplete="postal-code" required [(ngModel)]="a.postcode"></div>
          <div><label for="country">Country</label>
            <input id="country" name="country" autocomplete="country-name" required [(ngModel)]="a.country"></div>
        </div>
        @if (error) { <p class="error" role="alert">{{ error }}</p> }
        <button class="btn" type="submit">Save card</button>
      </form>
      <p class="sub" style="margin:16px 0 0"><a class="link" routerLink="/billing">Cancel and go back to billing</a></p>
    </section>
  </main>`,
  styles: [`.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    h2 { font-size: 1rem; margin: 8px 0 12px; padding-top: 16px; border-top: 1px solid var(--line); }
    .opt { color: var(--muted); font-weight: 400; }`],
})
export class UpdateCardComponent {
  private billing = inject(BillingService);
  private router = inject(Router);
  a: Address = { line1: '', line2: '', city: '', region: '', postcode: '', country: '' };
  name = ''; number = ''; expiry = ''; cvc = ''; error = '';

  save() {
    const digits = this.number.replace(/\s/g, '');
    if (!this.name.trim()) return this.fail('Enter the name on the card.');
    if (!/^\d{13,19}$/.test(digits)) return this.fail('Enter a card number with 13 to 19 digits.');
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiry)) return this.fail('Enter the expiry as MM/YY.');
    if (!/^\d{3,4}$/.test(this.cvc)) return this.fail('Enter the 3 or 4 digit CVC.');
    const { line1, city, region, postcode, country } = this.a;
    if (![line1, city, region, postcode, country].every(v => v.trim())) return this.fail('Complete the billing address (line 2 is optional).');
    // Demo only: send card data to your payment provider (e.g. Stripe), never store it yourself.
    const brand = digits.startsWith('4') ? 'Visa' : digits.startsWith('5') ? 'Mastercard' : 'Card';
    this.billing.card.set({ brand, last4: digits.slice(-4), expiry: this.expiry });
    this.billing.address.set({ ...this.a });
    this.router.navigate(['/billing']);
  }

  private fail(m: string) { this.error = m; }
}
