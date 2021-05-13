import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService, 
    private router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._auth.signOut();

    this.loginUserForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  submitLoginUserForm(): void {
    this._auth.signIn(this.loginUserForm.value.email, this.loginUserForm.value.password)
      .then(() => this.router.navigateByUrl('home'))
      .catch(() => this._toastr.error('Sikertelen bejelentkezés', 'Hiba'))
  }

}
