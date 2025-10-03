import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private firebase: FirebaseService, private auth: AuthService, private router: Router) {}

     loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    async authenticatedLogin() {
      const result = this.auth.loginWithGoogle()
      console.log('User: ', result);
      if (result) {
        this.router.navigate(['/dashboard']);
      }
    }

    async loginWithEmail() {
      const provider = new GoogleAuthProvider();
      const { email, password } = this.loginForm.value;
      const result = await signInWithEmailAndPassword(this.firebase.auth, email, password);
      console.log('User: ', result.user);
      this.router.navigate(['/dashboard']);
    }

    // DEPRECATED OCTOBER 2 
    // async loginWithGoogle() {
    //   const provider = new GoogleAuthProvider();
    //   const result = await signInWithPopup(this.firebase.auth, provider);
    //   console.log('User: ', result.user);
    //   this.router.navigate(['/dashboard']);
    // }

}
