import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserResponse } from '@retro-board/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getUserData$() {
    return this.http.get<IUserResponse>(`/api/users`);
  }
}
