import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.currentUserValue.access_token) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
