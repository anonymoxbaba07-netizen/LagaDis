import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { ReloginComponent } from './relogin.component';
import { BillingComponent } from './billing.component';
import { authGuard } from './auth.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Sign in · Ledgerline' },
  { path: 'relogin', component: ReloginComponent, title: 'Session expired · Ledgerline' },
  { path: 'billing', component: BillingComponent, canActivate: [authGuard], title: 'Billing · Ledgerline' },
  { path: '**', redirectTo: 'login' },
];
