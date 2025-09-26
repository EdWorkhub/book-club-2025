import { Component } from '@angular/core';
import { OpenLibraryBookDetail, LocalBook } from '../../../interfaces/book.interface';
import { LibraryService } from '../../../service/library.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {

  book: any;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService) {}

  olBookDetail?: OpenLibraryBookDetail

  localBookDetail?: 
  LocalBook

  ngOnInit(): void {
    // id becomes id passed in from ActivatedRoute (when clicked on from list)
    const id = this.route.snapshot.paramMap.get('id');
    // Then calls OL Detail api and populates 
    this.libraryService.getLocalBookDetail(id).subscribe(data => {
      console.log(data); 
      this.book = data;
    })
  }

}
