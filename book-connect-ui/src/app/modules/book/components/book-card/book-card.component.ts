import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RatingComponent} from "../rating/rating.component";


@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RatingComponent
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  private _book: BookResponse = {}
  private _manage: boolean = false;


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }


  @Input()
  set Book(value: BookResponse) {
    this._book = value
  }

  get Book() {
    return this._book
  }

  get bookCover() {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover
    }
    return "https://1.bp.blogspot.com/-HRRu6dw6FTI/UiGGOYfeeII/AAAAAAAAAV4/aLFjY4lAAXkpQzVzVrmi0Nicu-kNwqeKwCPcB/s1600/german.jpg";
  }


  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>()
  @Output() private archiveThis: EventEmitter<BookResponse> = new EventEmitter<BookResponse>()
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>()
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>()
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>()
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>()

  onShowDetails() {
    this.details.emit(this._book)
  }

  onBorrow() {
    this.borrow.emit(this._book)
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book)
  }

  onEdit() {
    this.edit.emit(this._book)
  }

  onShare() {
    this.share.emit(this._book)
  }

  onArchive() {
    this.archiveThis.emit(this._book)
  }
}
