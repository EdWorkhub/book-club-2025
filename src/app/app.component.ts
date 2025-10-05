import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FirebaseService } from '../service/firebase.service';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authReady = false;
  currentUser: User | null = null;

  constructor(private router: Router, private firebase: FirebaseService, private authService: AuthService) {
  }

  title = 'book-club-2025';

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      this.authReady = true;

      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }
}

