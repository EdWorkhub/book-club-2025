import { Component } from '@angular/core';
import { OpenLibraryBookDetail } from '../../../interfaces/open-library-book-detail.interface';
import { LibraryService } from '../../../service/library.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../../../service/auth.service';
import { NavigationService } from '../../../service/navigation.service';
import { LoadingService } from '../../../service/loading.service';

@Component({
  selector: 'app-search-detail',
  standalone: false,
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.scss',
})
export class SearchDetailComponent {
  // Need to fix this any and convert to BookDetail but have extraneous req/res properties to resolve
  book: any;
  user: User | null = null;
  isLoading = true;

  constructor(
    private nav: NavigationService,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  olBookDetail?: OpenLibraryBookDetail;

  // OL is fucking annoying
  get bookDescription(): string {
    // if missing, just hide
    if (!this.book.description) return '';
    // if it's just a string, return
    if (typeof this.book.description === 'string') {
      return this.book.description;
    }
    // ...if it's a string inside of an object, extract
    if (this.book.description.value) {
      return this.book.description.value;
    }
    // edge case
    return '';
  }

  ngOnInit(): void {
    // id becomes id passed in from ActivatedRoute (when clicked on from list)
    const id = this.route.snapshot.paramMap.get('id');
    this.loadingService.show();
    // Then calls OL Detail api and populates
    this.libraryService.getOpenLibraryBookDetail(id).subscribe({ next: 
      (data) => {
      this.book = data;
      this.loadingService.hide();
    }});
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log('From search detail: ', user);
    });
  }

  // Converts selected book from OL Book type to Local dbBook type and saves to LocalDB
  addBookToDB(book: OpenLibraryBookDetail) {
    console.log(book);
    this.libraryService.saveBook(book).subscribe({
      next: (res) => {
        console.log('Book saved!', res);
      },
      error: (err) => {
        console.error('Save failed!', err);
      },
    });
  }

  addBookToCurrentlyReading(book: OpenLibraryBookDetail) {
    // First add to Library
    this.libraryService.saveBook(book).subscribe({
      next: (res) => {
        console.log('Book saved!', res); // replicate addBookToDB logging
        const id = res.id;
        // Then add to member_books for given user
        this.libraryService.saveMemberBook(id, this.user.uid).subscribe({
          next: (resp) => console.log('Added to currently reading!', resp),
          error: (err) =>
            console.error('Add to currently reading failed!', err),
        });
      },
      error: (err) => console.error('Save failed!', err),
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
