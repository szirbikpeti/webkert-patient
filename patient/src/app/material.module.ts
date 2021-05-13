import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
  ]
})

export class MaterialModule {
}
