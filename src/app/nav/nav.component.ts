import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from 'firebase/auth';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  user: User | null = null;
  logo: string = './assets/logo.png';
  hamburgerOpen = false; 

  constructor(private nav: NavigationService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((data) => {
      this.user = data;
      console.log('From Nav: ', this.user);
    });
  }

  toggleHamburger() {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  // ROUTER
  navToLibrary() {
    this.nav.toLibrary();
  }

  navToSearch() {
    this.nav.toSearch();
  }

  navToMembers() {
    this.nav.toMembers();
  }

  navToLogin() {
    this.nav.toLogin();
  }

  navToDashboard() {
    this.nav.toDashboard();
  }

}
