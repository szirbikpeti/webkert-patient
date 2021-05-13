import { DefaultPipe } from './pipes/default.pipe';
import { OnHoverDirective } from './directives/on-hover.directive';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { ManagePatientComponent } from './pages/manage-patient/manage-patient.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { environment } from './../environments/environment';
import { MaterialModule } from './material.module';
import { NavMenuComponent } from './pages/nav-menu/nav-menu.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    ManagePatientComponent,
    ListPatientComponent,
    LoginComponent,
    RegistrationComponent,
    OnHoverDirective,
    DefaultPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    })
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
