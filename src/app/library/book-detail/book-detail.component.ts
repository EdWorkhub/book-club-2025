import { Component } from '@angular/core';
import { OpenLibraryBookDetail } from '../../../interfaces/open-library-book-detail.interface';
import { LocalBook } from '../../../interfaces/local-book.interface';
import { LibraryService } from '../../../service/library.service';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../../service/report.service';
import { AuthService } from '../../../service/auth.service';
import { User } from 'firebase/auth';
import { NavigationService } from '../../../service/navigation.service';
import { MemberBooksService } from '../../../service/member-books.service';
import { MembersService } from '../../../service/members.service';
import { LoadingService } from '../../../service/loading.service';

declare function showToast(message: string): void;

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent {
  book: LocalBook;
  user: User | null = null;
  currentlyReading = false;

  // Used to see if book is currently in member queue
  memberBooks: LocalBook[] = [];

  // showModal used to trigger Report modal
  showModal = false;

  constructor(
    private nav: NavigationService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private reportService: ReportService,
    private authService: AuthService,
    private memberBooksService: MemberBooksService,
    private membersService: MembersService,
    private loadingService: LoadingService
  ) {}

  olBookDetail: OpenLibraryBookDetail;
  localBookDetail: LocalBook;
  reports: any[];

  ngOnInit(): void {
    // id becomes id passed in from ActivatedRoute (when clicked on from list)
    const id = this.route.snapshot.paramMap.get('id');
    this.loadingService.show();
    // Then calls OL Detail api and populates
    this.libraryService.getLocalBookDetail(id).subscribe((data: LocalBook) => {
      console.log(data);
      this.book = data;

      // Fetch all reports associated with this bookId
      this.reportService
        .getBookReportsByBook(this.book.id)
        .subscribe((res: any) => {
          // map each observable item to an object
          this.reports = Object.values(res).map((report: any) => {
            // create object with space for user
            const mappedReport: any = {
              ...report,
              answers: JSON.parse(report.answers),
              user: null, // placeholder
            };

            // subscribe to user separately to parse memberId
            this.membersService
              .getMemberDetailByFirebaseUid(report.member_id)
              .subscribe((user) => {
                console.log(user);
                mappedReport.user = user;
              });
            return mappedReport; // each report
          });

          // Ensure user is available to be passed into report component
          this.authService.user$.subscribe((user) => {
            this.user = user;
            console.log(user);
            this.loadingService.hide();
          });

          // check if current book is one of member current books
          this.memberBooksService
            .getMemberBooks(this.user.uid)
            .subscribe((data) => {
              this.memberBooks = data;
              console.log(this.memberBooks);
              for (let i = 0; i < this.memberBooks.length; i++) {
                if (this.memberBooks[i].id === this.book.id) {
                  this.currentlyReading = true;
                  console.log(
                    'Currently Reading Value: ',
                    this.currentlyReading
                  );
                } else {
                  console.log('Not currently reading!');
                }
              }
            });
        });
    });
  }

  // Opens report component
  openReportModal() {
    this.showModal = true;
  }

  // Moves book to Reading History
  finishReading() {
    this.memberBooksService
      .postMemberFinishedReading(this.book.id, this.user.uid)
      .subscribe({
        next: () => {
          showToast("Book moved to History!");
          this.currentlyReading = false
        },
        error: () => alert('Failed to move book to history.'),
      });
  }

  // Add book to currently reading
  addToMemberBooks() {
    this.memberBooksService
      .postSaveMemberBook(this.book.id, this.user.uid)
      .subscribe({
        next: () => {
          alert('Added to currently reading!');
          this.currentlyReading = true;
        },
        error: (err) => console.error('Add to currently reading failed!', err),
      });
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
