import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private readonly snackBarService: SnackbarService) {}

  public handleError$(err: HttpErrorResponse) {
    const msg =
      `${err.error.statusCode} ${err.error.message}`.trim() || 'Unknown Error';
    this.snackBarService.open(msg, '');
    return throwError(() => new Error(err.message));
  }
}
