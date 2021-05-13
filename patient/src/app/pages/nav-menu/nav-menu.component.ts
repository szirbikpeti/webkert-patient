import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Action } from './../../enums/Action';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  action: Action;
  Action = Action;
  isExpanded = false;

  constructor(private router: Router, private _auth: AuthService) { }

  signOut(): void {
    console.log(this._auth.isAuthenticated());
    this._auth.signOut().then(() => this.router.navigateByUrl('login'))
  }
}
