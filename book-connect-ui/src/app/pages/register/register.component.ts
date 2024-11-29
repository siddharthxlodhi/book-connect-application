import {Component, Injectable} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router: Router,
              private authService: AuthenticationService,
              private toasterService:ToastrService) {
  }

  regRequest: RegistrationRequest = {
    email: "", lastName: "", password: "",
    firstName: ""

  }
  errorMsg: Array<string> = [];


  registerUser() {
    this.errorMsg=[];
    this.authService.register({
      body: this.regRequest
    }).subscribe({
      next:(res)=>{
        this.router.navigate(['activate-account'])
      },
      error: (err) => {
        console.log(err)
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors
          this.toasterService.error(err.error.validationErrors,'Oops!');
        } else {
          this.errorMsg.push(err.error.error)
        }
      }
    })

  }

  login() {
    this.router.navigate(['login'])
  }

}
