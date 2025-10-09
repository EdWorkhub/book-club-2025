import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OpenLibraryBook
} from '../interfaces/open-library-book.interface';
import { OpenLibraryBookDetail } from '../interfaces/open-library-book-detail.interface';
import { LocalBook } from '../interfaces/local-book.interface';


@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}
  dbBooks: LocalBook[] = [];
  // Local API
  private localApi = 'http://localhost:3000';
  // OL API
  private openLibraryApi = 'http://localhost:3000/api/books';
  // Storage for search results
    private lastSearch = {
    searchAll: '',
    searchTitle: '',
    searchAuthor: '',
    results: [] as OpenLibraryBook[]
  };
  setLastSearch(searchAll: string, searchTitle: string, searchAuthor: string, results: OpenLibraryBook[]) {
    this.lastSearch = { searchAll, searchTitle, searchAuthor, results };
  }
  getLastSearch() {
    return this.lastSearch;
  }

  // LOCAL API FUNCTIONS

  // Run onInit in LibraryComponent, fetches all books currently in local DB
  getLocalBooks() {
    return this.http.get<any[]>(`${this.localApi}/books`);
  }

  getLocalBookDetail(id) {
    return this.http.get<any>(`${this.localApi}/books/${id}`);
  }

  // DTO Mapping from OL to Local
  // Takes in book value of Book (OL) type and returns dbBook (local) shape
  bookDTO(book: OpenLibraryBookDetail): LocalBook {
    return {
      title: book.title,
      author: book.fullAuthors?.[0]?.name ?? '',
      published: book.firstPublishDate,
      // Makes id functional url 
      imageUrl: this.cleanImg(book.covers?.[0]) ?? '',
      olId: book.key,
      pages: book.pages,
      description:
        typeof book.description === 'string'
          ? book.description
          : book.description?.value ?? '',
    };
  }

  // Changes imageID from OpenLibraryBook into actual usable URL 
  cleanImg(imageUrl: string): string {
    let cleanedImageUrl =
      `https://covers.openlibrary.org/b/id/` + imageUrl + '-L.jpg';
    return cleanedImageUrl;
  }

  // Passes Book obj through DTO and saves dbBook to LocalDB
  saveBook(book: OpenLibraryBookDetail): Observable<LocalBook> {
    const dbObj = this.bookDTO(book);
    return this.http.post<any>(`${this.localApi}/books`, dbObj);
  }

  saveMemberBook(bookId: number, memberUid: string): Observable<LocalBook> {
    // saving bookId and member uid 
    const dbObj = { bookId, memberUid }
    return this.http.post<any>(`${this.localApi}/member_books`, dbObj)
  }

  // OL API FUNCTIONS

  // Get Book Detail page
  getOpenLibraryBookDetail(olId) {
    return this.http.get<OpenLibraryBookDetail>(
      `${this.openLibraryApi}${olId}`
    );
  }

  // Get Editions for ISBN as it is not stored at the generic 'work' level
  getOpenLibraryBookDetailEditions(olId: string): Observable<any> {
    return this.http.get<any>(`${this.openLibraryApi}${olId}/editions.json`);
  }

  // Search Query
  // Query can contain any or all values
  getSearchResult(
    search?: string,
    title?: string,
    author?: string
  ): Observable<OpenLibraryBook[]> {
    let queryParams = new HttpParams();
    [
      ['search', search],
      ['title', title],
      ['author', author],
    ].forEach(([key, value]) => {
      if (value) queryParams = queryParams.set(key, value);
    });

    const fullUrl = `${this.openLibraryApi}?${queryParams.toString()}`;
    console.log(fullUrl);

    return this.http.get<OpenLibraryBook[]>(this.openLibraryApi, {
      params: queryParams,
    });
  }
}
