import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, User, onAuthStateChanged, getAuth, browserLocalPersistence, Auth } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();
  private auth: Auth;

  constructor(private firebase: FirebaseService) {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, user => {
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

  // Passes ID to backend and validates aginst Firebase Auth FROM THERE 
  async validateIdToken(idToken) {
    try {
      const response = await fetch(`${this.localApi}/api/auth/firebase-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();
      console.log('Data from validation function:, ', data);
      return data;

    } catch (err) {
      console.error("Backend validation failed", err);
      return null;
    }
  }
}
  // TODO: Email Login 

  // TODO: Anonymous Login