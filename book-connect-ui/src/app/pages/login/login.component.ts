import {Component} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router,
              private authService: AuthenticationService,
              private service:TokenService,
           ) {
  }

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];


  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
        next: (res) => {
          this.service.token=res.jwtToken as string
          this.router.navigate(['books'])
        },
        error: (err) => {
          console.log(err)
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors
          } else {
            this.errorMsg.push(err.error.error)
          }
        }
      }
    )
  }

  register() {
    this.router.navigate(['register'])
  }
}
