import { ToastrService } from 'ngx-toastr';
import { ManagePatientComponent } from '../manage-patient/manage-patient.component';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { Action } from './../../enums/Action';
import { Observable, Subscription } from 'rxjs';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit, OnDestroy, AfterViewInit {
  patients: Observable<Patient[]>;
  action: Action;
  
  Action = Action;

  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private _patient: PatientService, 
    private dialog: MatDialog, private _toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.action = params['action'] as Action;
    });
  }
  
  ngAfterViewInit(): void {
    this.patients = this._patient.get();
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  get(func: string): void {
    this.patients = this._patient[func]();
  }
  
  openDialog(id: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        callback: () => {
          this._patient.delete(id)
            .then(() => this._toastr.success('Sikeres törlés', 'Info'))
            .catch(() => this._toastr.error('Sikertelen törlés', 'Hiba'));
        }
      }
    });
  }

  openEditModal(patient: Patient): void {
    if (this.action == Action.Delete) {
      return;
    }
    
    const ref = this.dialog.open(ManagePatientComponent, {
      height: window.innerHeight - 30 + 'px',
      width: '800px'
    });
    ref.componentInstance.data = patient;
  }
}
