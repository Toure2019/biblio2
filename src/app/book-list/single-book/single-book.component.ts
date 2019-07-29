import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private bookService: BooksService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() { 
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack(){
    this.router.navigate(['/books']);
  }

}
