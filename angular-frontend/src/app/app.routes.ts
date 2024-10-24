import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'patients/:id', component: PatientDetailComponent },
  { path: 'view-patient/id', component: ViewPatientComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home on empty path
  { path: '**', redirectTo: '/home' } // Wildcard route for 404
];
