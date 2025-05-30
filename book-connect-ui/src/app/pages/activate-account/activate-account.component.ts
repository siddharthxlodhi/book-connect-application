import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services/authentication.service';
import { CodeInputModule } from 'angular-code-input';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'] // Fixed typo to styleUrls
})
export class ActivateAccountComponent {
  message = '';
  isOkay = false;
  submitted = false;
  isLoading = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  confirmAccount(token: string) {
    this.isLoading = true;

    this.authService.activate({ activationToken: token }).subscribe({
      next: (response: { [key: string]: string }) => {
        this.isLoading = false;

        // Success response expected to have "message" key
        if (response['message']) {
          this.isOkay = true;
          this.message = response['message'];
          this.toastr.success(this.message);
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          // Unexpected success response shape
          this.isOkay = false;
          this.message = 'Unexpected response from server.';
          this.toastr.error(this.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isOkay = false;

        // Error handler: error response body has an "error" field
        // err.error might be an object with error message or a string
        if (err.error && typeof err.error === 'object' && 'error' in err.error) {
          this.message = err.error['error'];
        } else if (typeof err.error === 'string') {
          this.message = err.error;
        } else {
          this.message = 'Activation failed due to unknown error.';
        }

        this.toastr.error(this.message);
      }
    });
  }


  onCodeCompleted(token: string) {
    if (token.length === 6) {
      this.submitted = true;
      this.confirmAccount(token);
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  tryAgain() {
    this.submitted = false;
    this.message = '';
    this.isOkay = false;
    this.isLoading = false;
  }
}
