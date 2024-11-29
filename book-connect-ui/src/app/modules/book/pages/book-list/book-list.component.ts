import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../../../services/token/token.service";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {BookResponse} from "../../../../services/models/book-response";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent,
    NgIf
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  pageSize: number = 10;
  pageNo: number = 0;
  message: string = '';

  constructor(private service: BookService,
             private token: TokenService,
              private toastService:ToastrService) {
  }

  pageBookResponse: PageResponseBookResponse = {}
  level = 'success';

  ngOnInit(): void {
    console.log(this.token.token)
    this.getAllBooks()

  }

  private getAllBooks() {
    this.service.findAllBooks({
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


  borrowBook(book: BookResponse) {
    this.message = '';
    this.service.borrowBook({
      bookId: book.id as number
    }).subscribe({
      next: () => {
        this.toastService.success('Book ('+book.title +') successfully borrowed','Done!');
        // this.level = 'success';
        // this.message = 'Book ('+book.title +') successfully borrowed';
      },
      error: (err) => {
        // this.level = 'error';
        // this.message = err.error.error;
        this.toastService.error( err.error.error, 'Oops');
      }
    })
  }


  showInfo(book: BookResponse) {

  }

  waitingList(book: BookResponse) {

  }
}
