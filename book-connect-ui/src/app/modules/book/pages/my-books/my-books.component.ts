import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {BookService} from "../../../../services/services/book.service";
import {Router, RouterLink} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {
  pageSize: number = 5;
  pageNo: number = 0;

  constructor(private service: BookService,
              private router: Router) {
  }

  pageBookResponse: PageResponseBookResponse = {}

  ngOnInit(): void {

    this.getAllBooks()

  }

  private getAllBooks() {
    this.service.findAllBooksByOwner({
        pageSize: this.pageSize, pageNo: this.pageNo
      }
    ).subscribe({
        next: (res) => {
          this.pageBookResponse = res
        }
      }
    )
  }


  goToFirst() {
    this.pageNo = 0;
    this.getAllBooks()
  }

  goToPrevious() {
    this.pageNo--;
    this.getAllBooks()
  }

  goToNext() {
    this.pageNo++;
    this.getAllBooks()
  }

  goToLast() {
    this.pageNo = this.pageBookResponse.totalPages as number - 1;
    this.getAllBooks()
  }

  goToPage(index: number) {
    this.pageNo = index;
    this.getAllBooks()
  }

  get isLastPage(): boolean {
    return this.pageNo == this.pageBookResponse.totalPages as number - 1;
  }


  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id])
  }

  shareBook(book: BookResponse) {
    this.service.updateBookShareableStatus({
      bookId: book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable
      }
    });
  }

  archiveBook(book: BookResponse) {
    this.service.updateBookArchieveStatus({
      bookId: book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived
      }
    })
  }
}
