import { Component } from '@angular/core';
import { LibraryService } from '../../service/library.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenLibraryBook } from '../../interfaces/open-library-book.interface';
import { OpenLibraryBookDetail } from '../../interfaces/open-library-book-detail.interface';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  constructor(
    private router: Router,
    private libraryService: LibraryService,
    private loadingService: LoadingService
  ) {}

  // Imports OL Interface from Service
  books: OpenLibraryBook[] = [];

  searchForm = new FormGroup({
    searchAll: new FormControl(''),
    searchTitle: new FormControl(''),
    searchAuthor: new FormControl('')
  });

  ngOnInit(): void {
    this.loadingService.show();
    const last = this.libraryService.getLastSearch();
    this.searchForm.setValue({
      searchAll: last.searchAll,
      searchTitle: last.searchTitle,
      searchAuthor: last.searchAuthor
    });
    this.books = last.results;
    this.loadingService.hide();
  }

  navigateToDetail(book: OpenLibraryBook) {
    // Navigate via specific route to component (ie with an ID) by replacing the routing module /:id with relevant key in navigator function
    const id = book.olid;
    this.router.navigate(['/search', id]);
  }

  // Passes local search values into Service search function
  searchTitle() {
    const { searchAll, searchTitle, searchAuthor } = this.searchForm.value
    this.loadingService.show();
    this.libraryService.getSearchResult(searchAll, searchTitle, searchAuthor).subscribe((data) => {
      this.books = data;
      this.libraryService.setLastSearch(searchAll, searchTitle, searchAuthor, data)
      this.loadingService.hide();
    })
  }

  // Converts selected book from OL Book type to Local dbBook type and saves to LocalDB 
  addBookToDB(book: OpenLibraryBookDetail) {
    this.libraryService.saveBook(book).subscribe({
      next: res => {
        console.log('Book saved!', res);
      },
      error: err => {
        console.error("Save failed!", err)
      }
    });
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

  navToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
