import { Component } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.model'; // Import Patient interface
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  newPatient: Patient = {
    id: 0,
    full_name: '',
    id_number: '',
    email: '',
    street_name: '',
    city: '',
    zip_code: '',
    jpmg_number: '',
    doctor_name: '',
    treatment_duration: 0,
    notes: ''
  }; // Typed as Patient, initialized with empty values

  errorMessage = ''; // Add errorMessage to handle form errors

  constructor(
    private patientService: PatientService,
    private router: Router // Keep it private
  ) {}

  addPatient(): void {
    if (this.isValid()) {
      this.patientService.addPatient(this.newPatient).subscribe({
        next: () => {
          alert('Patient added successfully');
          this.resetForm(); // Reset the form after submission
          this.navigateHome(); // Use the method for navigation
        },
        error: () => {
          this.errorMessage = 'Failed to add patient. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields'; // Set error message for invalid form
    }
  }

  isValid(): boolean {
    return this.newPatient.full_name !== '' &&
           this.newPatient.id_number !== '' &&
           this.newPatient.email !== '' &&
           this.newPatient.street_name !== '' &&
           this.newPatient.city !== '' &&
           this.newPatient.zip_code !== '' &&
           this.newPatient.jpmg_number !== '' &&
           this.newPatient.doctor_name !== '' &&
           this.newPatient.treatment_duration > 0;
  }

  resetForm(): void {
    this.newPatient = {
      id: 0,
      full_name: '',
      id_number: '',
      email: '',
      street_name: '',
      city: '',
      zip_code: '',
      jpmg_number: '',
      doctor_name: '',
      treatment_duration: 0,
      notes: ''
    };
    this.errorMessage = ''; // Clear error message on form reset
  }

  navigateHome(): void {
    this.router.navigate(['/']); // Method to handle navigation
  }
}
