import { Injectable, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export type Session = { email: string; name: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  user = signal<Session | null>(null);
  /** Remembered after expiry so the re-login page can prefill the email. */
  lastEmail = signal<string>('');

  // Demo only: replace with a real API call.
  login(email: string, password: string): boolean {
    if (!email.includes('@') || password.length < 6) return false;
    const name = email.split('@')[0];
    this.user.set({ email, name });
    this.lastEmail.set(email);
    return true;
  }

  expire() {
    this.user.set(null);
    this.router.navigate(['/relogin']);
  }

  logout() {
    this.user.set(null);
    this.lastEmail.set('');
    this.router.navigate(['/login']);
  }
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.user()) return true;
  return router.createUrlTree([auth.lastEmail() ? '/relogin' : '/login']);
};
