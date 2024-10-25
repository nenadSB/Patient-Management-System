import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-patient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {
  patientId!: number;
  patient!: Patient;
  errorMessage: string | null = null;
  isEditing: boolean = false; // New variable to manage edit state

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = +params.get('id')!;
      this.loadPatient();
    });
  }

  loadPatient(): void {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (patient: Patient) => {
        this.patient = patient;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Patient not found';
        console.error(err);
      }
    });
  }

  editPatient(): void {
    this.isEditing = true; // Set edit mode
  }

  saveChanges(): void {
    this.patientService.updatePatient(this.patientId, this.patient).subscribe({
      next: () => {
        alert('Patient details updated successfully');
        this.isEditing = false; // Exit edit mode after saving
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to update patient. Please try again.';
        console.error('Error updating patient:', error);
      }
    });
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          alert('Patient deleted successfully');
          this.router.navigate(['/patients']);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'Failed to delete patient. Please try again.';
          console.error('Error deleting patient:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }
}

