import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { LoadingService } from '../service/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Global loading service obvs
  isLoading$: Observable<boolean>;
  // For AuthGuard
  authReady = false;
  currentUser: User | null = null;
  // Exclude nav from showing in Login Component
  isLoginRoute = false;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService) {
    // Make loading obvs available within template of entire app
    this.isLoading$ = this.loadingService.isLoading$;
    // Exclude Nav from Login page 
    this.router.events.subscribe(() => {
    this.isLoginRoute = this.router.url.includes('login');
  })}

  title = 'book-club-2025';

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      this.authReady = true;

      if (!user) {
        console.log("Authorized in AppComponent")
        // Uncomment this to restore boot to login 
        // this.router.navigate(['/login']);
      }
    });
  }
}

