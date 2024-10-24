import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Patient } from '../models/patient.model'; // Import the Patient model

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  templateUrl: './patient-detail.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient: Patient | null = null; // Use Patient type for better type safety

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? -1);
    if (id !== -1) {
      // Call the correct method here
      this.patientService.getPatientById(id).subscribe({
        next: (data: Patient) => {
          this.patient = data;
        },
        error: (error) => {
          console.error('Error fetching patient:', error);
          this.patient = null; // Handle error case
        },
        complete: () => {
          console.log('Fetch complete');
        }
      });
    } else {
      console.error('Invalid ID');
    }
  }

  savePatient(): void {
    if (this.patient) {
      this.patientService.updatePatient(this.patient.id, this.patient).subscribe({
        next: () => {
          alert('Patient information updated');
        },
        error: (err) => {
          console.error('Error updating patient:', err);
          alert('Failed to update patient information');
        }
      });
    }
  }
}
