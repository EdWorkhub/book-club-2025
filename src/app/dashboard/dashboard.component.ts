import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}


  // Router Functions 
  navToLibrary() {
    this.router.navigate(['/library']);
  }

  navToSearch() {
    this.router.navigate(['/search']);
  }

  navToMembers() {
    this.router.navigate(['/members']);
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

}
