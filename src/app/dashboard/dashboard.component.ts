import { Component } from '@angular/core';
import { MemberBooksService } from '../../service/member-books.service';
import { LocalBook } from '../../interfaces/local-book.interface';
import { AuthService } from '../../service/auth.service';
import { User } from 'firebase/auth';
import { NavigationService } from '../../service/navigation.service';
import { LoadingService } from '../../service/loading.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private memberBooksService: MemberBooksService,
    private authService: AuthService,
    private nav: NavigationService,
    private loadingService: LoadingService
  ) {}


  // Currently Reading 
  memberBooks: LocalBook[] = [];
  // Moved to History
  memberBooksHistory: LocalBook[] = [];
  // Books against which a given Member has submitted a Report
  memberReportedBooks: LocalBook[] = [];
  memberId: any;
  memberName: any;
  // Make global...
  user: User | null = null;

  // Can eventually refactor the three different MemberBooksService function, maybe switchmap w/ forkJoin? 
  async ngOnInit() {
    this.loadingService.show();
    // Fetch user data 
    this.authService.user$.subscribe((data) => {
      this.user = data;
      this.memberId = this.user.uid;
      this.memberName = this.user.displayName;
    });
    console.log('Dashboard ngOnInit, currentUser:', this.user);
    this.memberBooksService.getMemberBooks(this.memberId).subscribe(
      (data) => {
        console.log(data);
        this.memberBooks = data;
      },
      (err) => console.error('Error:', err)
    );
    this.memberBooksService.getMemberBooksHistory(this.memberId).subscribe(
      (data) => {
        console.log(data);
        this.memberBooksHistory = data;
      },
      (err) => console.error('Error:', err)
    );
    this.memberBooksService.getMemberReportedBooks(this.memberId).subscribe(
      (data) => {
        console.log(data);
        this.memberReportedBooks = data;
        this.loadingService.hide();
      },
      (err) => console.error('Error in reportedBooks:', err)
    );
  }


  // ROUTER 
  navToLibrary(): void {
    this.nav.toLibrary()
  }

  navToSearch(): void {
    this.nav.toSearch()
  }

  navToMembers(): void {
    this.nav.toMembers()
  }

  navToLogin(): void {
    this.nav.toLogin()
  }

  navToDashboard(): void {
    this.nav.toDashboard()
  }

  navigateToDetail(book: LocalBook): void {
    const id = book.id;
    this.nav.toBookDetail(id);
  }
}
