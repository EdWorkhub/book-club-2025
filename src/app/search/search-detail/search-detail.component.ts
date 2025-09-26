import { Component } from '@angular/core';
import { OpenLibraryBookDetail } from '../../../interfaces/book.interface';
import { LibraryService } from '../../../service/library.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-detail',
  standalone: false,
  templateUrl: './search-detail.component.html',
  styleUrl: './search-detail.component.scss'
})
export class SearchDetailComponent {

  // Need to fix this any and convert to BookDetail but have extraneous req/res properties to resolve
  book: any;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService) {}

  olBookDetail?: OpenLibraryBookDetail

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
    // Then calls OL Detail api and populates 
    this.libraryService.getOpenLibraryBookDetail(id).subscribe(data => {
      console.log(data); 
      this.book = data;
    })
    // Seeing if I can easily populate ISBN data from first edition of work 
    // this.libraryService.getOpenLibraryBookDetailEditions(id).subscribe(response => {
    //   console.log(response);
    //   const editionsArray = response.entries;
    //   const bestIsbn = this.libraryService.getBestIsbn(editionsArray);
    //   console.log("ISBN:", bestIsbn);
    //   return bestIsbn;
    // })
  }

}
