import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../core/services';
import { throwError } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public register() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res) {
        this.registerForm.reset();
        this.router.navigateByUrl('/login');
        this.snackbarService.open('User registered. Please login.');
        return res;
      }
      return throwError(() => new Error(res));
    });
  }
}
