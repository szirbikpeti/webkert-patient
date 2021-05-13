import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  addUserForm: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService, 
    private router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6) ,Validators.required]],
      confirmPassword: ['', [Validators.minLength(6) ,Validators.required]]
    },{
      validators: 
      (formGroup: FormGroup) => {
        const control = formGroup.controls['password'];
        const matchingControl = formGroup.controls['confirmPassword'];
    
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    });
  }

  submitAddUserForm(): void {
    this._auth.create(this.addUserForm.value.email, this.addUserForm.value.password).then(
      () => {
        this._toastr.success('Sikeres regisztrálás', 'Info')
        this.router.navigateByUrl('home');
      }
    ).catch(() => this._toastr.error('Sikertelen regisztrálás', 'Hiba'));
  }

}
