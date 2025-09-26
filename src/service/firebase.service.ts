import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged, User } from 'firebase/auth';
import { Firestore, getFirestore, doc, setDoc, getDoc, serverTimestamp, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  public auth: Auth;
  private db: Firestore;

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
  

  // Keeps more than one auth instance from attempting to connect - launches firebase
  this.app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  this.auth = getAuth(this.app);
  this.db = getFirestore(this.app);

  onAuthStateChanged(this.auth, async (user) => {
    if (user) {
      await this.createOrUpdateUserProfile(user);
    } else {
      console.log('Signed out!')
    }
  });
  }

  private async createOrUpdateUserProfile(user: User): Promise<void> {
    try {
      // Load user data from firestore db
      const userRef = doc(this.db, 'users', user.uid);

      // load firestore doc if exists
      const snap = await getDoc(userRef);

      // align time
      const now = serverTimestamp(); 

      // if no firestore doc exists create new doc for user
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid, 
          displayName: user.displayName || null,
          email: user.email || null,
          createdAt: now,
          lastSeen: now
        });
        console.log(`Created new user profile for ${user.uid}`);
      } else {
        // or just update last seen
        await setDoc(userRef, { lastSeen: now }, { merge: true });
        console.log(`Updated lastSeen for ${user.uid}`);
      }
    } catch (err) {
      console.error('createOrUpdateUserProfile error:', err);
    }
  }

  // Fetch user data
  public async getUserProfile(uid: string): Promise<DocumentData | null> {
    try {
      const snap = await getDoc(doc(this.db, 'users', uid));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error('getUserProfile error:', err);
      return null;
    }
  }


}