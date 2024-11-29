import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BookService} from "../../../../services/services/book.service";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-returned-books',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit {

  pageNo = 0;
  pageSize = 5;


  constructor(private bookService: BookService,
              private toastService:ToastrService) {
  }

  returnedBookPageResponse: PageResponseBorrowedBookResponse = {};
  message: string = '';
  level: string = 'success'


  ngOnInit(): void {
    this.findAllReturnedBooks()
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      pageNo: this.pageNo,
      pageSize: this.pageSize
    }).subscribe({
      next: (resp) => {
        this.returnedBookPageResponse = resp;
      }
    });
  }


  goToFirst() {
    this.pageNo = 0;
    this.findAllReturnedBooks()
  }

  goToPrevious() {
    this.pageNo--;
    this.findAllReturnedBooks()
  }

  goToNext() {
    this.pageNo++;
    this.findAllReturnedBooks()
  }

  goToLast() {
    this.pageNo = this.returnedBookPageResponse.totalPages as number - 1;
    this.findAllReturnedBooks()
  }

  goToPage(index: number) {
    this.pageNo = index;
    this.findAllReturnedBooks()
  }

  get isLastPage(): boolean {
    return this.pageNo == this.returnedBookPageResponse.totalPages as number - 1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      return;
    }
    this.bookService.approveReturnBorrowedBook({
      bookId: book.id as number
    }).subscribe({
      next: () => {
        // this.level = 'success';
        // this.message = 'Book return approved'
        this.toastService.success('Book return approved','Done!')
        this.findAllReturnedBooks()
      },
      error:(err)=>{
        this.level = 'error';
        this.message = err.error.error
      }
    })
  }
}
