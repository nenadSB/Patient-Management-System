import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Patient } from '../models/patient.model';



@Component({
  selector: 'app-patient-detail',
  standalone: true,
  templateUrl: './patient-detail.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null; // Use Patient type for better type safety
  loading: boolean = true; // Loading state
  errorMessage: string | null = null; // Error message for better user feedback

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? -1);
    if (id !== -1) {
      this.fetchPatient(id);
    } else {
      this.errorMessage = 'Invalid patient ID';
      this.loading = false; // Stop loading on error
    }
  }

  private fetchPatient(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (data: Patient) => {
        this.patient = data;
        this.errorMessage = null; // Clear any previous errors
      },
      error: (error) => {
        console.error('Error fetching patient:', error);
        this.errorMessage = 'Failed to fetch patient information.';
        this.patient = null; // Handle error case
      },
      complete: () => {
        console.log('Fetch complete');
        this.loading = false; // Stop loading when complete
      }
    });
  }

  savePatient(): void {
    if (this.patient) {
      this.patientService.updatePatient(this.patient.id, this.patient).subscribe({
        next: () => {
          alert('Patient information updated successfully.');
          this.errorMessage = null; // Clear error message on success
        },
        error: (err) => {
          console.error('Error updating patient:', err);
          this.errorMessage = 'Failed to update patient information.';
        }
      });
    } else {
      this.errorMessage = 'No patient information to save.';
    }
  }

  cancel(): void {
    // Handle cancel operation, e.g., navigate back or reset the form
  }
}
