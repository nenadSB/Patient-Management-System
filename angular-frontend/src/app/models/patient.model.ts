// src/app/models/patient.model.ts
export interface Patient {
  id: number;
  full_name: string;
  id_number: string;
  email: string;
  street_name: string;
  city: string;
  zip_code: string;
  jpmg_number: string;
  notes?: string;  // Optional field
  doctor_name: string;
  treatment_duration: number;
}
