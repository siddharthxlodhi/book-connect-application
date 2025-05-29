import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/services/authentication.service";
import { CodeInputModule } from "angular-code-input";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { ToastrService } from "ngx-toastr";

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
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  message = '';
  isOkay = false;
  submitted = false;
  isLoading = false;

  confirmAccount(token: string) {
    this.isLoading = true;

    this.authService.activate({ activationToken: token }).subscribe({
      next: (response: string) => {
        this.isLoading = false;
        this.isOkay = true;
        this.message = response; // Will show "Account activated successfully"
        this.toastr.success(this.message);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.isOkay = false;
        this.message = err.error || 'Activation failed';
        this.toastr.error(this.message);
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    if (token.length === 6) { // Validate code length
      this.submitted = true;
      this.confirmAccount(token);
    }
  }
}
