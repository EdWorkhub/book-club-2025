import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Needs this as component not in universal nav
  logo: string = './assets/logo.png';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async authLogin(): Promise<void> {
    try {
      const member = await this.auth.loginWithGoogle();
      console.log('Member:', member);
      if (member) this.router.navigate(['/dashboard']);
      else console.error('Login failed during frontend authentication!');
    } catch (err) {
      console.error('Google login error:', err);
    }
  }

  async loginWithEmail(): Promise<void> {
    const { email, password } = this.loginForm.value;
    const member = await this.auth.loginWithEmail(email, password);
    if (member) this.router.navigate(['/dashboard']);
    else console.error('Login failed during frontend email authentication!');
  }
  catch(err) {
    console.error('Google login error:', err);
  }
}