 import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {BookService} from "../../../../services/services/book.service";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {FeedbackComponent} from "../../components/feedback/feedback.component";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf,
    FeedbackComponent
  ],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {

  pageNo = 0;
  pageSize = 5;


  constructor(private bookService: BookService) {
  }

  borrowedBooksPageResponse: PageResponseBorrowedBookResponse = {};
  selectedBook: BookResponse | undefined = undefined;

  ngOnInit(): void {

    this.findAllBorrowedBooks()
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }).subscribe({
      next: (resp) => {
        this.borrowedBooksPageResponse = resp;
      }
    });
  }


  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
  }

  goToFirst() {
    this.pageNo = 0;
    this.findAllBorrowedBooks()
  }

  goToPrevious() {
    this.pageNo--;
    this.findAllBorrowedBooks()
  }

  goToNext() {
    this.pageNo++;
    this.findAllBorrowedBooks()
  }

  goToLast() {
    this.pageNo = this.borrowedBooksPageResponse.totalPages as number - 1;
    this.findAllBorrowedBooks()
  }

  goToPage(index: number) {
    this.pageNo = index;
    this.findAllBorrowedBooks()
  }

  get isLastPage(): boolean {
    return this.pageNo == this.borrowedBooksPageResponse.totalPages as number - 1;
  }


  isSelected(value: BookResponse | undefined) {
    this.selectedBook = value;
  }
}
