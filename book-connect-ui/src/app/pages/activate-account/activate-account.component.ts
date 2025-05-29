import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/services/authentication.service";
import { CodeInputModule } from "angular-code-input";
import { Router } from "@angular/router";
import { NgIf, CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'] // ✅ FIX: use styleUrls (with "s")
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
      next: (response: string) => {
        this.isLoading = false;
        this.isOkay = true;
        this.message = response || 'Account activated successfully';
        this.toastr.success(this.message);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.isOkay = false;
        this.message = err?.error?.message || err?.error || 'Activation failed';
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
  }
}
