import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected to styleUrls
})
export class AppComponent {
  title = 'angular-frontend';

  // Inject AuthService and Router
  constructor(private authService: AuthService, private router: Router) {}

  // Method to log out
  logout(): void {
    this.authService.logout(); // Call logout method from AuthService
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authService.getAuthStatus();
  }
}
