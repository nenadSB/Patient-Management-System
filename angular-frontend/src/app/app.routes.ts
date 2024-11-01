import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'add-patient', component: AddPatientComponent, canActivate: [AuthGuard] },
  { path: 'patients/:id', component: PatientDetailComponent, canActivate: [AuthGuard] },
  { path: 'view-patient/:id', component: ViewPatientComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
