// login.component.ts
import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Admin Login</h2>
      <input [(ngModel)]="username" placeholder="Username" class="form-control">
      <input [(ngModel)]="password" type="password" placeholder="Password" class="form-control">
      <button (click)="onLogin()">Login</button>
      <p *ngIf="error" style="color: red">{{ error }}</p>
    </div>
  `,
  styles: ['.login-container { max-width: 300px; margin: 100px auto; padding: 20px; border: 1px solid #ccc; text-align: center; } input { display: block; width: 100%; margin: 10px 0; padding: 8px; }']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error = 'Invalid Credentials'
    });
  }
}