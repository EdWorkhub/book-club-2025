import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  public auth: Auth;

  constructor() {
  const firebaseConfig = {
  apiKey: "AIzaSyAx9y_4aS4WzO2tc8Me29EX0223gV45Gk0",
  authDomain: "book-club-2025.firebaseapp.com",
  projectId: "book-club-2025",
  storageBucket: "book-club-2025.firebasestorage.app",
  messagingSenderId: "232797413431",
  appId: "1:232797413431:web:dbaccfbb0adb3c0d361fb2",
  measurementId: "G-12DQTQT90Z"
  };
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }
}