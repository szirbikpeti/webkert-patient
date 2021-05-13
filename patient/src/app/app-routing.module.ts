import { AuthGuard } from './guards/auth.guard';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { ManagePatientComponent } from './pages/manage-patient/manage-patient.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-patient',
    component: ManagePatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-patient',
    component: ListPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
