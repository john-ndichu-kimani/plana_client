import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.service';
import { new_user } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUserForm!: FormGroup;
  registerSuccess:boolean = false;
  registerError:boolean = false;
  successMessage:string = '';
  errorMessage:string = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerUserForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      password_hash: ['', [Validators.required, this.validatePassword()]]
    });
  }

  registerUser(): void {
    const user: new_user = this.registerUserForm.value;

    this.authService.createAccount(user).subscribe(
      (res) => {
        this.showSuccessToast('User registered successfully.');
        this.registerUserForm.reset();
      },
      (error: HttpErrorResponse) => {
        if (error.error && error.error.error) {
          this.showErrorToast(error.error.error);
        } else {
          this.showErrorToast('Unknown error occurred.');
        }
      }
    );
  }

  private showSuccessToast(message: string): void {
    this.registerSuccess = true;
    this.successMessage = message;
    setTimeout(() => {
      this.registerSuccess = false;
      this.successMessage = '';

      this.router.navigate(['/login'])
    }, 2000);
  }

  private showErrorToast(error: string): void {
    this.registerError = true;
    this.errorMessage = error;
    setTimeout(() => {
      this.registerError = false;
      this.errorMessage = '';
    }, 2000);
  }

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
