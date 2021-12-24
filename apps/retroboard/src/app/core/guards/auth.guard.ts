import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const url = segments.join('/');

    if (url) {
      switch (true) {
        case url.endsWith('user/register'):
        case url.endsWith('user/login'):
          return true;
      }
    }

    return this.checkUser();
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkUser();
  }

  checkUser() {
    if (!this.authService.currentUserValue.access_token) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
