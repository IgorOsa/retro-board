import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IBoard,
  IColumn,
  IComment,
  ILike,
  ITask,
} from '@retro-board/api-interfaces';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { debounceTime, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public store$: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>({
    _id: '6197e48265c7a3830f70c880',
    title: 'Demo board',
    columns: [],
  });

  constructor(private readonly http: HttpClient) {}

  getFullBoard$() {
    forkJoin([this.getBoard$(), this.getColumns$()])
      .pipe(
        debounceTime(500),
        retry(3),
        map((data) => ({
          ...data[0],
          columns: data[1].map((el) => {
            if (el?._id) {
              this.getTasks$(el._id).subscribe((t) => {
                const sortFn = (a: ITask, b: ITask) => {
                  return a.order > b.order ? 1 : -1;
                };
                t.sort(sortFn);
                el.tasks = t;
              });
            }
            return el;
          }),
        }))
      )
      .subscribe((board) => {
        this.store$.next(board);
      });

    return this.store$;
  }

  getBoard$(): Observable<IBoard> {
    const b$ = this.http.get<IBoard>(`/api/board`);
    return b$;
  }

  getColumns$(): Observable<IColumn[]> {
    const c$ = this.http.get<IColumn[]>(`/api/column`);
    return c$;
  }

  addColumn$(payload: Omit<IColumn, '_id' | 'tasks'>): Observable<IColumn> {
    const c$ = this.http.post<IColumn>('/api/column', payload);
    return c$;
  }

  removeColumn$(_id: string) {
    const c$ = this.http.delete<IColumn>(`/api/column/${_id}`);
    return c$;
  }

  getTasks$(columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/column/${columnId}/tasks`);
  }

  addTask$(payload: Omit<ITask, '_id'>): Observable<ITask> {
    const c$ = this.http.post<ITask>('/api/task', payload);
    return c$;
  }

  updateTask$(_id: string, payload: ITask) {
    const c$ = this.http.put<ITask>(`/api/task/${_id}`, payload);
    return c$;
  }

  removeTask$(_id: string) {
    const c$ = this.http.delete<ITask>(`/api/task/${_id}`);
    return c$;
  }

  getComments$(_id: string) {
    const c$ = this.http.get<IComment[]>(`/api/task/${_id}/comments`);
    return c$;
  }

  addComment$(payload: IComment) {
    const c$ = this.http.post<IComment>(`/api/comment`, payload);
    return c$;
  }

  getLikes(taskId: string) {
    const c$ = this.http.get<ILike[]>(`/api/task/${taskId}/likes`);
    return c$;
  }

  addLike$(payload: ILike) {
    const c$ = this.http.post<ILike>(`/api/like`, payload);
    return c$;
  }

  removeLike$(payload: ILike) {
    const c$ = this.http.post<ILike>(`/api/like/remove`, payload);
    return c$;
  }
}
