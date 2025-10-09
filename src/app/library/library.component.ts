import { Component, OnInit, } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { LocalBook } from '../../interfaces/local-book.interface';
import { NavigationService } from '../../service/navigation.service';
import { FormControl } from '@angular/forms';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  constructor(
    private libraryService: LibraryService,
    private nav: NavigationService,
    private loadingService: LoadingService
  ) {}

  bookList: LocalBook[] = [];
  filteredBookList: LocalBook[] = [];
  searchTerm: string = '';
  searchControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.loadingService.show();
    // Fetch all books from db 
    this.libraryService.getLocalBooks().subscribe((data) => {
      console.log(data);
      this.bookList = data;
      this.filteredBookList = data;
      this.loadingService.hide();
    });


    // tracking ngModel for Library search - temp
    this.searchControl.valueChanges
      .subscribe((term: string) => {
        const value = term?.toLowerCase() || '';
        this.filteredBookList = this.bookList.filter((b) =>
          b.title.toLowerCase().includes(value)
        );
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

  navigateToDetail(book: LocalBook): void {
    const id = book.id;
    this.nav.toBookDetail(id);
  }
}
