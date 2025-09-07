import { Injectable } from '@angular/core';
import jsonSampleData from './sample-book-data.json';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  private _books = jsonSampleData

  get books() {
    return this._books;
  }

}
