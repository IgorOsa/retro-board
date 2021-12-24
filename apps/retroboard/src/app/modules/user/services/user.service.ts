import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserResponse } from '@retro-board/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public store$!: BehaviorSubject<IUserResponse>;

  constructor(private readonly http: HttpClient) {
    this.getUserData$().subscribe((data) => {
      this.store$ = new BehaviorSubject(data);
    });
  }

  getUserData$(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`/api/user`);
  }

  setCurrentUser(): void {
    this.getUserData$().subscribe((data) => {
      this.store$.next(data);
    });
  }

  getCurrentUser(): IUserResponse {
    return this.store$.value;
  }

  getCurrentUserName(): string {
    const user = this.store$.value;
    return `${user.firstName} ${user.lastName}`;
  }

  getUserById$(userId: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`/api/user/${userId}`);
  }
}
