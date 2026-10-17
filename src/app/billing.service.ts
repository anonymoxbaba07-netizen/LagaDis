import { Injectable, signal } from '@angular/core';

export type Card = { brand: string; last4: string; expiry: string };

export type Address = { line1: string; line2: string; city: string; region: string; postcode: string; country: string };

@Injectable({ providedIn: 'root' })
export class BillingService {
  card = signal<Card>({ brand: 'Visa', last4: '4242', expiry: '08/28' });
  address = signal<Address | null>(null);
}
