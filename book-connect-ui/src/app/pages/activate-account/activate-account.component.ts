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

  private confirmAccount(activationToken: string) {
    this.isLoading = true;
    this.authService.activate({ activationToken }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // Handle both string and object responses
        if (typeof response === 'string' && response.includes('Activated')) {
          this.isOkay = true;
          this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        } else if (response?.status === 'success') {
          this.isOkay = true;
          this.message = response.message || 'Account activated successfully';
        } else {
          this.isOkay = false;
          this.message = 'Activation successful but unexpected response';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isOkay = false;
        this.message = err.error?.error ||
          err.error?.message ||
          err.message ||
          'Activation failed. Please try again.';
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
