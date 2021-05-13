import { MatDialogRef } from '@angular/material/dialog';
import { Action } from '../../enums/Action';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../models/Contact';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patient';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { createNewAddressForm, createNewContactForm, createNewIdentifierForm, createNewLinkForm, 
  createNewNameForm, createNewPeriodForm, createNewPhotoForm, createNewTelecomForm } from 'src/app/utilities/creation.form';

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {
  @Input() data: Patient;
  isModal: boolean = false;

  managePatientForm: FormGroup;

  private create = { 
    'identifier': () => createNewIdentifierForm(this.fb),
    'name': () => createNewNameForm(this.fb),
    'telecom': () => createNewTelecomForm(this.fb),
    'address': () => createNewAddressForm(this.fb),
    'photo': () => createNewPhotoForm(this.fb),
    'contact': () => createNewContactForm(this.fb),
    'period': () => createNewPeriodForm(this.fb),
    'link': () => createNewLinkForm(this.fb),
  };

  private dialogRef: MatDialogRef<ManagePatientComponent>;

  constructor(private fb: FormBuilder, private _patient: PatientService, 
    private _toastr: ToastrService, private router: Router, private injector: Injector) {
  }
  
  private setDate(patient: Patient, formName: string) {
    if (patient[formName]) {
      for (let form of patient[formName]) {
        if (form.period) {
          for (let field in form.period) {
            if (form.period[field]) {
              form.period[field] = this.convertToDateString(form.period[field]);
            }
          }
        }
      }
    }
  }

  private convertToDateString(field) {
    return new Date(field).toDateString();
  }
  
  private setFormGroupValuesInFormArrays(): void {
    if (this.birthDate.value) {
      this.birthDate.setValue(new Date(this.birthDate.value));
    }

    for (let control in this.data) {
      if (control === 'identifier' || control === 'contact') {
        let i = 0;
        for (let formName of this.data[control]) {
          if (formName.period) {
            this.changeFormExistsOfFormArray(control, 'period', i);
            
            if (formName.period.start) {
              this[control].at(i)
                .get('period')
                .get('start').setValue(new Date(formName.period.start));
            }
            if (formName.period.end) {
              this[control].at(i)
                .get('period')
                .get('end').setValue(new Date(formName.period.end));
            }
          }

          if (control === 'contact') {
            if ((formName as Contact).name) {
              this.changeFormExistsOfFormArray('contact', 'name', i);

              if ((formName as Contact).name.text) {
                this.contact.at(i).get('name').get('text').setValue((formName as Contact).name.text);
              }
              
              if ((formName as Contact).name.family) {
                this.contact.at(i).get('name').get('family').setValue((formName as Contact).name.family);
              }
            }
          }
          
          i++;
        }
      }
    }
  }

  ngOnInit(): void {
    this.managePatientForm = this.fb.group({
      id: [''],
      active: [false],
      gender: [''],
      birthDate: [''],
      deceasedBoolean: [false],
      multipleBirth: [false]
    });

    if (this.data) {
      this.isModal = true;
      this.dialogRef = <MatDialogRef<ManagePatientComponent>>this.injector.get(MatDialogRef);

      for (let control in this.data) {
        if (typeof(this.data[control]) === 'object') {
          for (let i = 0; i < this.data[control].length; i++) {
            this.addNewArrayFormToPatient(control);
          }
        }
      }
      
      this.managePatientForm.patchValue(this.data);
      this.setFormGroupValuesInFormArrays();
    }
  }

  addNewArrayFormToPatient(formName: string): void {
    this.isShowFormInPatient(formName)
      ? this[formName].push(this.create[formName]())
      : this.managePatientForm.addControl(formName, this.fb.array([this.create[formName]()]));
  }

  changeFormExistsOfFormArray(formArrayName: string, formName: string, index: number): void {
    const indexedArray = this[formArrayName].at(index) as FormGroup;

    this.isShowFormOfFormArray(formArrayName, formName, index)
      ? indexedArray.removeControl(formName) 
      : indexedArray.addControl(formName, this.create[formName]());
  }

  isShowFormOfFormArray(formArrayName: string, formName: string, index: number): boolean {
    return (this[formArrayName].at(index) as FormGroup).contains(formName);
  }

  isShowFormInPatient(formName: string): boolean {
    return this.managePatientForm.contains(formName);
  }
  
  deleteArrayElement(formArrayName: any, index: number): void {
    this[formArrayName].removeAt(index);

    if (this[formArrayName].length === 0) {
      this.managePatientForm.removeControl(formArrayName);
    }
  }

  submitManagePatientForm(): void {    
    if (this.managePatientForm.invalid) {
      return;
    }

    let patient: Patient = this.managePatientForm.value;

    if (patient.birthDate) {
      patient.birthDate = this.convertToDateString(patient.birthDate);
    }
    
    this.setDate(patient, 'identifier');
    this.setDate(patient, 'contact');
    
    this.isModal 
      ? this._patient.update(patient)
        .then(() => {
          this._toastr.success('Sikeres módosítás', 'Info');
          this.dialogRef.close();
        })
        .catch(() => this._toastr.error('Sikertelen módosítás', 'Hiba'))
      : this._patient.create(patient)
        .then(() => {
          this._toastr.success('Sikeres hozzáadás','Info');
          this.router.navigate(['/list-patient', {action: Action.Modification}]);
        })
        .catch(() => this._toastr.error('Sikertelen hozzáadás', 'Hiba'));
    
    // this._patient.get().subscribe(patient => console.log(patient));
    // this.patients = this._patient.get(); // + async pipe html-be
    // this._patient.getWithComplexQuery().subscribe(patient => console.log(patient));

  }
  
  get identifier(): FormArray {return this.managePatientForm.get('identifier') as FormArray;}
  
  get name(): FormArray {return this.managePatientForm.get('name') as FormArray;}
  
  get telecom(): FormArray {return this.managePatientForm.get('telecom') as FormArray;}
  
  get address(): FormArray {return this.managePatientForm.get('address') as FormArray;}
  
  get photo(): FormArray {return this.managePatientForm.get('photo') as FormArray;}
  
  get contact(): FormArray {return this.managePatientForm.get('contact') as FormArray;}
  
  get link(): FormArray {return this.managePatientForm.get('link') as FormArray;}

  get birthDate(): AbstractControl {return this.managePatientForm.get('birthDate');}
}
