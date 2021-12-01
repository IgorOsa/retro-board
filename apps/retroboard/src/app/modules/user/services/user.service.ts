import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserResponse } from '@retro-board/api-interfaces';
import { BehaviorSubject } from 'rxjs';

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

  getUserData$() {
    return this.http.get<IUserResponse>(`/api/user`);
  }

  setCurrentUser() {
    this.getUserData$().subscribe((data) => {
      this.store$.next(data);
    });
  }

  getUserById$(userId: string) {
    return this.http.get<IUserResponse>(`/api/user/${userId}`);
  }
}
