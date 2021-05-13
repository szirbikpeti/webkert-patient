import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public _auth: AuthService) { }
}
