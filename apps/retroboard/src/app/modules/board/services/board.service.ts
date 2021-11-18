import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard } from '@retro-board/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private readonly http: HttpClient) {}

  getColumns$() {
    return this.http.get<IBoard>(`/api/board`);
  }
}
