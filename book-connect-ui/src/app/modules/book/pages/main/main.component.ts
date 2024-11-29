import { Component } from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {RouterOutlet} from "@angular/router";
import {SearchBooksComponent} from "../../../google-book/pages/search-books/search-books.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    SearchBooksComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {


  handle($event: any) {

  }
}
