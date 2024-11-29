import {Component} from '@angular/core';
import {MenuComponent} from '../../../book/components/menu/menu.component';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SearchBooksComponent} from '../search-books/search-books.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-g-main',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    FormsModule,
    RouterLink,
    SearchBooksComponent,
    NgIf
  ],
  templateUrl: './g-main.component.html',
  styleUrls: ['./g-main.component.scss'],
})
export class GMainComponent {
  constructor(private router:Router) {
  }


  query: undefined | string = undefined;
  sortBy: string = 'sort'; // Default value for sortBy
  filter: string = 'filter';

  queryPass:undefined|string=undefined;


  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }


  searchGoogleBooks() {
this.query=this.queryPass;
  }


  Home() {
    this.router.navigate(['books']);
  }
}
