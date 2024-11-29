import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/services/authentication.service";
import {CodeInputModule} from "angular-code-input";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  constructor(private authService: AuthenticationService,
              private router: Router,
              private toasterService:ToastrService) {

  }

  message = '';
  isOkay = true;
  submitted = false;

  private confirmAccount(activationToken: string) {
    this.authService.activate({
      activationToken
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.isOkay=true
      },
      error: (err) => {
        if (err.error.error){
          this.message =err.error.error;
          this.isOkay = false;
        }

      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.submitted=true
    this.confirmAccount(token);
  }
}
