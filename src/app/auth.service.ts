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
    async loginWithGoogle(): Promise<User | null> {
      const provider = new GoogleAuthProvider();
      try {
        // Also possible to do signInWithRedirect
        const result = await signInWithPopup(this.firebase.auth, provider)
        return result.user;
      } catch (err) {
        console.error('Login failed', err)
        return null;
      }
    }


  // TODO: Email Login 

  // TODO: Anonymous Login 

}
