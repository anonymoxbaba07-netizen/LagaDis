import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LogoComponent],
  template: `
  <main class="shell">
    <section class="panel">
      <app-logo />
      <h1>Sign in</h1>
      <p class="sub">Manage your plan and invoices.</p>
      <form (ngSubmit)="submit()" #f="ngForm">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="username" required [(ngModel)]="email">
        <label for="pw">Password</label>
        <input id="pw" name="pw" type="password" autocomplete="current-password" required [(ngModel)]="password">
        @if (error) { <p class="error" role="alert">{{ error }}</p> }
        <button class="btn" type="submit">Sign in</button>
      </form>
    </section>
  </main>`,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = ''; password = ''; error = '';

  submit() {
    if (this.auth.login(this.email, this.password)) this.router.navigate(['/billing']);
    else this.error = 'Enter a valid email and a password of at least 6 characters.';
  }
}
