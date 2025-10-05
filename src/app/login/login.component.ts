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

    async authLogin() {
      let member = await this.auth.loginWithGoogle()
      console.log(member);
      if (member) {
      this.router.navigate(['/dashboard']);
      } else {
        console.log("Login Failed during frontend authentication!")
      }
    }

    // FOR DEBUGGING LOGIN WITHOUT CALLING AUTH SERVICE 
    // async authenticatedLogin() {
    //   const provider = new GoogleAuthProvider()
    //   const result = await signInWithPopup(this.firebase.auth, provider)
    //   console.log('User: ', result);
    //   if (result) {
    //     this.router.navigate(['/dashboard']);
    //   }
    // }

    async loginWithEmail() {
      const provider = new GoogleAuthProvider();
      const { email, password } = this.loginForm.value;
      const result = await signInWithEmailAndPassword(this.firebase.auth, email, password);
      console.log('User: ', result.user);
      this.router.navigate(['/dashboard']);
    }

}
