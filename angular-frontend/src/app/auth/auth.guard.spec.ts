import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {
    // Check local storage on initialization to maintain state
    this.isAuthenticated = this.checkAuth();
  }

  login(email: string, password: string): boolean {
    // Replace with real authentication logic (API call)
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

  // New method to get authentication status
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
