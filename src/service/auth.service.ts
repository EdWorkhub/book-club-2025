import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Init firebase object 
  constructor(private firebase: FirebaseService) { }

  // Google Provider Login 
    async loginWithGoogle(): Promise<string | null> {
      const provider = new GoogleAuthProvider();

      try {
        // Also possible to do signInWithRedirect
        const result = await signInWithPopup(this.firebase.auth, provider);
        const user = result.user;
        if (!user) return null;

        // Get Firebase ID Token 
        const idToken = await user.getIdToken();

        // Send ID Token to Backend for Validation 
        return idToken;

    } catch (err) {
      console.error('Login failed', err);
      return null;
    }
  }

  async validateIdToken(idToken) {
    try {
      const response = await fetch('api/auth/firebase-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idToken})
      });

      const data = await response.json();
      return data;

    } catch (err) {
      console.error("Backend validation failed", err);
      return null;
    }
  }
}
  // TODO: Email Login 

  // TODO: Anonymous Login 