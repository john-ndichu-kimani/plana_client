import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { login_details } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm!: FormGroup;
  loginError: boolean = false;
  loginSuccess: boolean = false;
  successMessage:string = '';
  errorMessage:string = '';


  constructor(private fb:FormBuilder,private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password_hash: ['', [Validators.required, this.validatePassword()]]
    })
  }



  login(details: login_details) {
    this.authService.loginUser(details).subscribe(res => {
      if (res.token) {
    localStorage.setItem('token',res.token);

        this.authService.checkDetails(res.token).subscribe(res => {
          console.log(res['info']?.user_id);

          if (res['info']) {
        this.showSuccessToast('Logged in successfully!');
        this.loginForm.reset();

            localStorage.setItem('user_id', res['info'].user_id);

            setTimeout(() => {
              this.loginSuccess = false;
              if (res['info']?.role === 'attendee') {
                this.router.navigate(['user']);
              } else if (res['info']?.role === 'super_admin') {
                this.router.navigate(['admin']);
              }
              else if(res['info']?.role === 'manager'){
                this.router.navigate(['manager']);
              }
            }, 2000);
          }
        });
      } else if (res.error) {
        this.showErrorToast("Incorrect email or passsword");
      }
    });
  }


  private showSuccessToast(message: string): void {
    this.loginSuccess = true;
    this.successMessage = message;
    setTimeout(() => {
      this.loginSuccess = false;
      this.successMessage = '';

      this.router.navigate(['/login'])
    }, 2000);
  }

  private showErrorToast(error: string): void {
    this.loginError = true;
    this.errorMessage = error;
    setTimeout(() => {
      this.loginError = false;
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

