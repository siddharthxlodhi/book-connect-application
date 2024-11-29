import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {BookRequest} from "../../../../services/models/book-request";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {
  constructor(private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastService:ToastrService
  ) {
  }

  errorMsg: Array<string> = [];
  bookRequest: BookRequest = {authorName: "", isbn: "", synopsis: "", title: ""}
  selectedBookCover: any;
  selectedPicture: string | undefined;

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookById({
        bookId
      }).subscribe({
        next: (bookRes) => {
          this.bookRequest = {
            authorName: bookRes.authorName as string,
            id: bookRes.id
            , isbn: bookRes.isbn as string,
            shareable: bookRes.shareable,
            synopsis: bookRes.synopsis as string,
            title: bookRes.title as string

          }
          if (bookRes.cover){
            this.selectedPicture='data:image/jpg;base64,'+bookRes.cover
          }
        }
      })
    }

  }


  onFileSelected(event: Event): void {
    this.selectedBookCover = (event.target as HTMLInputElement).files?.[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    console.log(this.selectedPicture);
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCover({
          'bookId': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.toastService.success('Book information has been successfully saved','Done!');
            this.router.navigate(['/books/my-books'])
          }
        })
      },
      error: (err) => {
        this.toastService.error('Something went wrong','Oops!')
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
