import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PageResponseItem} from "../../../../services/models/page-response-item";
import {GoogleBookService} from "../../../../services/services/google-book.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RatingComponent} from "../../../book/components/rating/rating.component";


@Component({
  selector: 'app-search-books',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RatingComponent,
    NgOptimizedImage,
  ],
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss']
})
export class SearchBooksComponent implements OnChanges {


  constructor(private gService: GoogleBookService) {

  }


  startIndex: number = 0;
  maxResults: number = 20;
  bookRes: PageResponseItem = {};

 @Input()query: undefined | string = undefined;
  filter: undefined | string = undefined;
  sortBy: undefined | string = undefined;

  @Input()
  set Filter(value: string | undefined) {
    if (value != 'filter') {
      this.filter = value;
    }
  }


  @Input()
  set Sort(value: string | undefined) {
    if (value != 'sort') {
      this.sortBy = value;
    }
  }

  resetSearchParams() {
    this.query = undefined;

  }


  searchGoogleBook() {
    this.gService.searchBooks({
      query: this.query as string,
      maxResults: this.maxResults,
      startIndex: this.startIndex,
      filter: this.filter,
      orderBy: this.sortBy
    }).subscribe({
      next: (val) => {
        console.log(val);
        this.bookRes = val;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['query'] && this.query) ) {
      this.searchGoogleBook();
    }
  }

  goToFirst() {
    this.startIndex = 0;
    this.searchGoogleBook();
  }

  goToPrevious() {
    if (this.startIndex > 0) {
      this.startIndex = Math.max(0, this.startIndex - this.maxResults);
      this.searchGoogleBook();
    }
  }

  goToNext() {
    if (this.startIndex + this.maxResults < (this.bookRes.totalElements as number)) {
      this.startIndex = Math.min( (this.bookRes.totalElements as number)- this.maxResults, this.startIndex + this.maxResults);
      this.searchGoogleBook();
    }
  }

  goToLast() {
    this.startIndex = Math.max(0, Math.floor(( (this.bookRes.totalElements as number) - 1) / this.maxResults) * this.maxResults);
    this.searchGoogleBook();
  }


  get isLastPage(): boolean {
    return this.startIndex + this.maxResults >=  (this.bookRes.totalElements as number);
  }

  isPreviewAvailable(book: any): boolean {
    return book.accessInfo?.viewability !== 'NO_PAGES';
  }


  scrollToTop() {
    scrollTo({top: 0, behavior: 'smooth'});
  }


}
