import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private firebase: FirebaseService, private router: Router) {}

    async login() {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.firebase.auth, provider);
      console.log('User: ', result.user);
      this.router.navigate(['/dashboard']);
    }

}
