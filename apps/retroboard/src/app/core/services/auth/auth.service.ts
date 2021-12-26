import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse, IUser } from '@retro-board/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<IAuthResponse>;
  public currentUser!: Observable<IAuthResponse>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<IAuthResponse>(
      JSON.parse(this.storageService.get('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IAuthResponse {
    return this.currentUserSubject.value;
  }

  register(user: IUser): Observable<IUser> {
    const api = `/api/user`;
    return this.http.post<IUser>(api, user).pipe();
  }

  login(email: string, password: string): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>('/api/auth/login', { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.set('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout(): void {
    // remove user from local storage to log user out
    this.storageService.remove('currentUser');
    this.currentUserSubject.next({ access_token: '' });
  }
}
