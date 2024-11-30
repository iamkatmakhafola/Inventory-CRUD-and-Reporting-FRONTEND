import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule, 
    FlexLayoutModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFormGroup: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {}

  LoginUser() {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;

      this.backendService.LoginUser(this.loginFormGroup.value).subscribe({
        next: (result) => {
          localStorage.setItem('User', JSON.stringify(result));
          this.loginFormGroup.reset();
          this.router.navigateByUrl('product-listing');
          this.snackBar.open('Login successful', 'X', { duration: 2000 });
          this.isLoading = false;
        },
        error: (err) => {
          let errorMessage = 'Login failed. Please try again.';
          if (err.status === 401) {
            errorMessage = 'Invalid email or password.';
          } else if (err.status === 500) {
            errorMessage = 'Internal server error. Please contact support.';
          }
          this.snackBar.open(errorMessage, 'X', { duration: 3000 });
          this.isLoading = false;
        }
      });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'X', { duration: 3000 });
    }
  }
}
