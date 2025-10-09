import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  onAuthStateChanged,
  getAuth,
  Auth,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Currently logged in user to be subscribed to within other components 
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();
  private auth: Auth;

  constructor(
    private firebase: FirebaseService,
    private nav: NavigationService
  ) {
    this.auth = getAuth();
    // Used for Auth Guard
    onAuthStateChanged(this.auth, (user) => {
      this._user.next(user);
    });
  }

  private localApi = 'http://localhost:3000';

  // Google Provider Login
  async loginWithGoogle(): Promise<string | null> {
    const provider = new GoogleAuthProvider();
    console.log('In Auth Service');
    try {
      // Also possible to do signInWithRedirect
      const result = await signInWithPopup(this.firebase.auth, provider);
      const user = result.user;
      if (!user) return null;
      // Get Firebase ID Token
      const idToken = await user.getIdToken();

      // Send ID Token to Backend for Validation
      this.validateIdToken(idToken);
      console.log('Returned idToken: ', idToken);
      return idToken;
    } catch (err) {
      console.error('Login failed', err);
      return null;
    }
  }

  async loginWithEmail(
    email: string,
    password: string
  ): Promise<string | null> {
    try {
      console.log('In Auth Service');
      const payload = { email, password };
      const result = await signInWithEmailAndPassword(
        this.firebase.auth,
        email,
        password
      );
      const user = result.user;
      if (!user) return null;
      const idToken = await user.getIdToken();
      this.validateIdToken(idToken);
      console.log('Returned idToken: ', idToken);
      return idToken;
    } catch (err) {
      console.error('Email login failed:', err);
      return null;
    }
  }

  // Passes ID to backend and validates aginst Firebase Auth FROM THERE
  async validateIdToken(idToken) {
    try {
      const response = await fetch(`${this.localApi}/api/auth/firebase-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      console.log('Data from validation function:, ', data);
      return data;
    } catch (err) {
      console.error('Backend validation failed', err);
      return null;
    }
  }
}
