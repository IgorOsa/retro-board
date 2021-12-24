import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  closeSign = 'Close';
  matSnackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 5000, // in ms
  };

  constructor(readonly snackBar: MatSnackBar) {}

  get defaultCloseSign() {
    return this.closeSign;
  }

  config(): MatSnackBarConfig {
    return this.matSnackBarConfig;
  }

  open(
    message: string,
    action = this.closeSign,
    config: MatSnackBarConfig = this.matSnackBarConfig
  ) {
    return this.snackBar.open(message, action, config);
  }
}
