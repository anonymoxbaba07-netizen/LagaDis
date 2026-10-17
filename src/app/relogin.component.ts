import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-relogin',
  standalone: true,
  imports: [FormsModule, LogoComponent],
  template: `
  <main class="shell">
    <section class="panel">
      <app-logo />
      @if (auth.reason() === 'expired') {
        <h1>Your session expired</h1>
        <p class="sub">You were signed out after a period of inactivity. Enter your password to continue.</p>
      } @else {
        <h1>Confirm it's you</h1>
        <p class="sub">Enter your password again to open your billing.</p>
      }
      <form (ngSubmit)="submit()">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" [value]="email" readonly>
        <label for="pw">Password</label>
        <input id="pw" name="pw" type="password" autocomplete="current-password" required [(ngModel)]="password" autofocus>
        @if (error) { <p class="error" role="alert">{{ error }}</p> }
        <button class="btn" type="submit">Continue</button>
      </form>
      <p class="sub" style="margin:16px 0 0">Not you? <button class="link" type="button" (click)="auth.logout()">Use a different account</button></p>
    </section>
  </main>`,
})
export class ReloginComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  email = this.auth.lastEmail();
  password = ''; error = '';

  constructor() { if (!this.email) this.router.navigate(['/login']); }

  submit() {
    if (this.auth.login(this.email, this.password)) this.router.navigate(['/billing']);
    else this.error = 'That password is too short. Use at least 6 characters.';
  }
}
