import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberBooksService } from '../../service/member-books.service';
import { LocalBook } from '../../interfaces/book.interface';
import { FirebaseService } from '../../service/firebase.service';
import { AuthService } from '../../service/auth.service';
import { take } from 'rxjs/operators';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router, private memberBooksService: MemberBooksService, private firebaseService: FirebaseService, private authService: AuthService) {}

  memberBooks: any[] = [];
  memberId: any;
  memberName: any;
  logo: string = './assets/logo.png'
  user: User | null = null;

  async ngOnInit() {

  this.authService.user$.subscribe(data => {
    this.user = data;
    this.memberId = this.user.uid
    this.memberName = this.user.displayName; 
  })
  console.log('Dashboard ngOnInit, currentUser:', this.user);
  // this.user is now valid after login. once you go back to auth, try and validate against this object in localStorage as a way to bypass the auth refresh issues 

  this.memberBooksService.getMemberBooks(this.memberId).subscribe(
    data => {
      console.log(data);
      this.memberBooks = data;
    },
    err => console.error('Error:', err)
  );
}

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
