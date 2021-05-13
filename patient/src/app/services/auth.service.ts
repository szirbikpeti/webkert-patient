import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  constructor(private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(result => this.isAuth = (result !== null));
  }

  create(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  
  signIn(email: string, password: string) : Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut() : Promise<void> {
    await this.afAuth.signOut();
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  currentUserObservable(): any {
    return this.afAuth.authState;
  }
}
