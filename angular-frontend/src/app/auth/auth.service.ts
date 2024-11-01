import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    // Simple validation for demo purposes; replace with real authentication logic
    if (email === 'admin@example.com' && password === 'password123') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  checkAuth(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
