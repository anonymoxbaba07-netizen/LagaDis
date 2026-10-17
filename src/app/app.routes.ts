import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { ReloginComponent } from './relogin.component';
import { BillingComponent } from './billing.component';
import { UpdateCardComponent } from './update-card.component';
import { authGuard } from './auth.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, title: 'Sign in · Ledgerline' },
  { path: 'relogin', component: ReloginComponent, title: 'Session expired · Ledgerline' },
  { path: 'billing', component: BillingComponent, canActivate: [authGuard], title: 'Billing · Ledgerline' },
  { path: 'billing/update-card', component: UpdateCardComponent, canActivate: [authGuard], title: 'Update card · Ledgerline' },
  { path: '**', redirectTo: 'login' },
];
