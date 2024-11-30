import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule, 
    FlexLayoutModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  registerFormGroup: FormGroup;

  constructor(private router: Router, private backendService: BackendService, private fb: FormBuilder, private snackBar: MatSnackBar) { 
    this.registerFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  ngOnInit(): void {
  }

  RegisterUser() {
    if (this.registerFormGroup.valid) {
      this.backendService.RegisterUser(this.registerFormGroup.value).subscribe({
        next: () => {
          this.registerFormGroup.reset();
          this.router.navigate(['/login']).then(navigated => {
            if (navigated) {
              this.snackBar.open('Registered successfully', 'X', { duration: 2000 });
            }
          });
        },
        error: (err) => {
          let errorMessage = 'Registration failed. Please try again.';
          if (err.status === 403) {
            errorMessage = 'Account already exists.';
          } else if (err.status === 500) {
            errorMessage = 'Internal server error. Please contact support.';
          }
          this.snackBar.open(errorMessage, 'X', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'X', { duration: 3000 });
    }
  }
  

  cancel() {
    this.registerFormGroup.reset();
    this.router.navigate(['/login']);
  }
}
