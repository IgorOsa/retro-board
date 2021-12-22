import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { SnackbarService } from '../';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly snackBarService: SnackbarService
  ) {}

  public handleError$(err: HttpErrorResponse) {
    let msg =
      `${err.error.statusCode} ${err.error.message}`.trim() || 'Unknown Error';

    if (err.status === 401) {
      msg = 'Wrong auth data or session expired.';
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }

    this.snackBarService.open(msg, '');

    return throwError(() => new Error(err.message));
  }
}
