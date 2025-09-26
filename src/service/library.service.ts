import { Injectable } from '@angular/core';
import dbSampleData from '../json/db-data.json';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { OpenLibraryBook, OpenLibraryBookDetail, LocalBook } from '../interfaces/book.interface';
import jsonSampleData from '../json/bbc-book-data.json';

@Injectable({
  providedIn: 'root',
})

export class LibraryService {

  constructor(private http: HttpClient) {}

  // Array of dbBook objects used as template for loading from local DB 
  dbBooks: LocalBook[] = [];

  // Local API
  private localApi = 'http://localhost:3000';
  // OL API 
  private openLibraryApi = 'http://localhost:3000/api/books';

  // LOCAL API FUNCTIONS 

  // Run onInit in LibraryComponent, fetches all books currently in local DB 
  getLocalBooks() {
    return this.http.get<any[]>(`${this.localApi}/books`);
  }

  getLocalBookDetail(id) {
    return this.http.get<any[]>(`${this.localApi}/books/${id}`);
  }

  // DTO Mapping from OL to Local
  // Takes in book value of Book (OL) type and returns dbBook (local) shape
  bookDTO(book: OpenLibraryBook): LocalBook {
    return {
      title: book.title,
      author: book.author,
      published: String(book.year),
      imageUrl: book.coverUrl ?? '',
      id: 0,
      olId: ''
    };
  }

  // Passes Book obj through DTO and saves dbBook to LocalDB 
  saveBook(book: OpenLibraryBook): Observable<any> {
    const dbObj = this.bookDTO(book);
    return this.http.post<any>(`${this.localApi}/books`, dbObj);
  }

  // Post JSON data to Local DB 
  postToDB() {
    // requests is filtered any[] -> this clears undefined error from chatGPT, will need to investigate further in future 
    const requests = (dbSampleData as any[]).filter(book => !!book).map(book => 
      // push each books obj to /books
     this.http.post<any[]>(`${this.localApi}/books`, book)
  );
    
  // forkJoin allows to wait for all observables to emit and then only performs result behavior when emissions complete 
    forkJoin(requests).subscribe({
      next: responses => {
        console.log("posted", responses);
      },
      error: err => {
        console.error("post failed", err);
      }
    });
  };

  // Parse original BBC JSON, again
  fetchData() {
    this.dbBooks = (jsonSampleData as any[]).map((item) => ({
      isbn: item.ISBN,
      title: item.Name,
      author: item.PrimaryCreator,
      description: item.Description,
      published: item.DateSuggested,
      imageUrl: item.ImageUrl,
      pages: item.PagesCount
    }));

    console.log(this.dbBooks);

    const blob = new Blob([JSON.stringify(this.dbBooks, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'isbn-books.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  // OL API FUNCTIONS 

  // Get Book Detail page 
  getOpenLibraryBookDetail(olId) {
    return this.http.get<OpenLibraryBookDetail>(`${this.openLibraryApi}${olId}`)
  }

  // Get Editions for ISBN as it is not stored at the generic 'work' level
  getOpenLibraryBookDetailEditions(olId: string): Observable<any> {
    return this.http.get<any>(`${this.openLibraryApi}${olId}/editions.json`);
  }

  // // Edition Sorting 
  // getBestIsbn(editions: any[]): string | null {
  //   if (!editions?.length) return null;

  //   // Return only language = english, format = physical (hardcover/paperback) and prefer newest published date
  //   const candidates = editions.filter(
  //     // Keep only candidates that either contain eng or no language (as not labeled if english-only)
  //     e => e.languages?.some((language: any) => language.key.includes("eng")));

  //     const fallbackEditions = editions.filter(
  //     e => !e.languages?.some((l: any) => l.key.includes("eng"))
  //     );
  //     // perform a/b sort - ranks hardcover and paperback higher than non physical
  //     const sortByPhysicalThenDate = (a: any, b: any) => {
  //       const aPhysical = /hardcover|paperback/i.test(a.physical_format || "") ? 1 : 0;
  //       const bPhysical = /hardcover|paperback/i.test(b.physical_format || "") ? 1 : 0;
  //       // if physical rank 1 otherwise 0
  //       if (bPhysical !== aPhysical) return bPhysical - aPhysical;

  //       // check to see which date is greater and prefer new
  //       const aDate = new Date(a.publish_date ?? "1900").getTime();
  //       const bDate = new Date(b.publish_date ?? "1900").getTime();
  //       return bDate - aDate
  //     };

  //     const sortedEnglish = candidates.sort(sortByPhysicalThenDate);

  //     // Return best possible ISBN from sort / filter results
  //     for (const e of sortedEnglish) {
  //       if (e.isbn_13?.length) return e.isbn_13[0];
  //       if (e.isbn_10?.length) return e.isbn_10[0];
  //     }

  //     // Fallback if only one edition or none meet sort / filter criteria
  //     const sortedFallback = fallbackEditions.sort(sortByPhysicalThenDate);
  //     for (const f of sortedFallback) {
  //       if (f.isbn_13?.length) return f.isbn_13[0];
  //       if (f.isbn_10?.length) return f.isbn_10[0];
  //     }
  //     return null;
  // }

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

    return this.http.get<OpenLibraryBook[]>(this.openLibraryApi, { params: queryParams });
  }
}

// CURRENTLY UNUSED 
// EXTRACT TITLE / AUTHOR / PUBLISHED DATE JSON DATA FROM BETTER BOOK CLUB JSON

// import jsonSampleData from '../json/bbc-book-data.json';

//   export interface isbnBook {
//   ISBN?: string;
// }

//   isbnBooks: isbnBook[] = [];

//   fetchTitleAuthorPublishedGenreImage() {
//     this.dbBooks = (jsonSampleData as any[]).map((item) => ({
//       title: item.Name,
//       author: item.PrimaryCreator,
//       published: item.DateSuggested,
//       imageUrl: item.ImageUrl
//     }));

//     console.log(this.dbBooks);

//     const blob = new Blob([JSON.stringify(this.dbBooks, null, 2)], {
//       type: 'application/json',
//     });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'isbn-books.json';
//     a.click();

//     URL.revokeObjectURL(url);
//   }

//   // EXTRACT ISBN / ASIN JSON DATA FROM BETTER BOOK CLUB JSON

//   // fetch ISBN data from BBC DB JSON Copy
//   fetchISBN() {
//     // isbnBooks is array of isbnBook type (temporary)
//     // Map imported JSON object (or array of objects) into new array of isbnBooks type which only parses out ISBN value
//     // Originally tried to use .pipe() -> this is only for Observable type rxJS values
//     this.isbnBooks = (jsonSampleData as any[]).map((item) => {
//       // .trim() treats empty string as boolean FALSE - shows ASIN where ISBN not present
//       // ISBN: item.ISBN?.trim() || item.ASIN
//       if (item.ISBN?.trim()) {
//         return { ISBN: item.ISBN };
//       } else {
//         return { ASIN: item.ASIN };
//       }
//     });

//     console.log(this.isbnBooks);

//     const blob = new Blob([JSON.stringify(this.isbnBooks, null, 2)], {
//       type: 'application/json',
//     });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'isbn-books.json';
//     a.click();

//     URL.revokeObjectURL(url);
//   }
