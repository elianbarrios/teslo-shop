import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/authService';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LoginPage {
  protected fb = inject(FormBuilder);
  protected hasErrors = signal(false);
  protected isPosting = signal(false);
  private router = inject(Router);

  protected authService = inject(AuthService);

  protected loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected onSubmit() {
    if (this.loginForm.invalid) {
      this.hasErrors.set(true);

      setTimeout(() => {
        this.hasErrors.set(false);
      }, 3000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService
      .login(email!, password!)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
          return;
        }

        this.hasErrors.set(true);
        setTimeout(() => {
          this.hasErrors.set(false);
        }, 2000);
      });
  }
}
