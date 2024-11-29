import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RatingComponent} from "../rating/rating.component";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FormsModule} from "@angular/forms";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";
import {Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    RatingComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
  constructor(private feedbackService: FeedbackService,
              private bookService: BookService,
              private router: Router,
              private toasterService:ToastrService
  ) {
  }

  feedbackRequest: FeedbackRequest = {bookId: 0, comment: "",note:0};

  @Input()
  book: BookResponse | undefined = undefined;

  @Output() isSelected: EventEmitter<BookResponse | undefined> = new EventEmitter<BookResponse | undefined>();

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      bookId: this.book?.id as number
    }).subscribe({
      next: () => {
        this.toasterService.success('Book has been returned and the owner is notified','Success!')
        if (withFeedback) {
          this.giveFeedback()
          this.toasterService.success('Feedback submitted','Success!')
        }
        this.isSelected.emit(undefined)
      }
    })

  }


  giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
      }

    })
  }

  ngOnInit(): void {
    this.feedbackRequest.bookId = this.book?.id as number;
  }
}
