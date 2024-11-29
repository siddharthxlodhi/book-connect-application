import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GMainComponent} from "./pages/g-main/g-main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {SearchBooksComponent} from "./pages/search-books/search-books.component";


const routes: Routes = [{
  path: '',
  component: GMainComponent,
  canActivate: [authGuard],
  // children: [{
  //   path: '',
  //   component: SearchBooksComponent,
  //   canActivate: [authGuard]
  // }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleBookRoutingModule  {


}
