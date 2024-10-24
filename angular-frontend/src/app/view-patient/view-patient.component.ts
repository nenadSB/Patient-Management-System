import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.model'; // Import Patient interface
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse for error handling
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
  patientId!: number; // ID of the patient to view
  patient!: Patient; // Patient object to hold the patient data
  errorMessage: string | null = null; // For error handling

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.patientId = +params.get('id')!; // Get the patient ID from route parameters
      this.loadPatient();
    });
  }

  loadPatient(): void {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (patient: Patient) => { // Specify the type of patient
        this.patient = patient;
      },
      error: (err: HttpErrorResponse) => { // Specify the type of error
        this.errorMessage = 'Patient not found';
        console.error(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/patients']); // Navigate back to the patients list or desired route
  }
}
