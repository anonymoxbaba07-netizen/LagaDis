import { Injectable, signal } from '@angular/core';

export type Card = { brand: string; last4: string; expiry: string };

@Injectable({ providedIn: 'root' })
export class BillingService {
  card = signal<Card>({ brand: 'Visa', last4: '4242', expiry: '08/28' });
}
