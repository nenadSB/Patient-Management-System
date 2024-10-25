import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.model';  // Import the Patient interface
import { Router } from '@angular/router';  // Import Router for navigation
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-home',
  standalone: true,  // Indicate that this component is standalone
  imports: [CommonModule],  // Import CommonModule for ngIf and ngFor
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  patients: Patient[] = [];  // Explicit typing as Patient array
  loading = false;  // Add loading state to show loading indicators
  errorMessage = '';  // Store error messages for display

  constructor(
    private patientService: PatientService,
    private router: Router  // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Load patients from the service
  loadPatients(): void {
    this.loading = true;  // Show loading indicator
    this.errorMessage = '';  // Reset error message
    this.patientService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        this.loading = false;  // Hide loading indicator
      },
      error: (error) => {
        this.errorMessage = 'Failed to load patients. Please try again later.';  // Set error message
        console.error('Error loading patients:', error);
        this.loading = false;  // Hide loading indicator even on error
      }
    });
  }

  // Navigate to patient detail view
  viewPatient(id: number): void {
    this.router.navigate(['/view-patient', id]);  // Navigate to the correct patient detail route
  }

  // Delete patient and reload the list
  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          this.loadPatients();  // Reload patients after deletion
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete patient. Please try again.';  // Set error message
          console.error('Error deleting patient:', error);
        }
      });
    }
  }

  // Navigate to add patient form
  goToAdd(): void {
    this.router.navigate(['/add-patient']);  // Navigate to add patient form
  }
}
