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
import { debounceTime, map, retry, tap } from 'rxjs/operators';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public store$: BehaviorSubject<IBoard> = new BehaviorSubject<IBoard>({
    _id: '6197e48265c7a3830f70c880',
    title: 'Demo board',
    columns: [],
  });

  constructor(
    private readonly http: HttpClient,
    private userService: UserService
  ) {}

  getFullBoard$(): BehaviorSubject<IBoard> {
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
    return this.http.post<IColumn>('/api/column', payload).pipe(
      tap((res) => {
        const board = Object.assign({}, this.store$.value);
        board.columns.push({
          _id: res._id,
          title: res.title,
          boardId: res.boardId,
          tasks: [],
        });
        this.store$.next(board);
      })
    );
  }

  updateColumn$(
    _id: string,
    payload: Omit<IColumn, '_id' | 'tasks'>
  ): Observable<IColumn> {
    return this.http.patch<IColumn>(`/api/column/${_id}`, payload).pipe(
      tap((updated) => {
        const board = Object.assign({}, this.store$.value);
        const up = board.columns.find((c) => c._id === _id);
        if (up) {
          up.title = updated.title;
          this.store$.next(board);
        }
      })
    );
  }

  removeColumn$(_id: string): Observable<IColumn> {
    return this.http.delete<IColumn>(`/api/column/${_id}`).pipe(
      tap((data) => {
        if (data) {
          const board = Object.assign({}, this.store$.value);
          const rest = board.columns.filter((item) => item._id !== _id);
          board.columns = [...rest];
          this.store$.next(board);
        }
      })
    );
  }

  getTasks$(columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/column/${columnId}/tasks`);
  }

  addTask$(payload: Omit<ITask, '_id'>): Observable<ITask> {
    return this.http.post<ITask>('/api/task', payload).pipe(
      tap((created) => {
        const board = Object.assign({}, this.store$.value);
        const col = board.columns.find((c) => c._id === created.columnId);
        const userName = this.userService.getCurrentUserName();

        if (col) {
          const { _id, title, columnId, userId, order } = created;
          col.tasks.push({
            _id,
            title,
            columnId,
            order,
            userId,
            userName,
          });
          this.store$.next(board);
        }
      })
    );
  }

  updateTask$(_id: string, payload: Partial<ITask>): Observable<ITask> {
    return this.http.patch<ITask>(`/api/task/${_id}`, payload).pipe(
      tap((updated) => {
        const board = Object.assign({}, this.store$.value);
        const col = board.columns.find((c) => c._id === updated.columnId);
        if (col) {
          const task = col.tasks.find((t) => t._id === _id);
          if (task?.title && payload?.title) {
            task.title = payload.title;
            this.store$.next(board);
          }
        }
      })
    );
  }

  removeTask$(_id: string): Observable<ITask> {
    return this.http.delete<ITask>(`/api/task/${_id}`).pipe(
      tap((data) => {
        if (data) {
          const board = Object.assign({}, this.store$.value);
          const col = board.columns.find((c) => c._id === data.columnId);
          if (col) {
            const rest = col.tasks.filter((item) => item._id !== _id);
            col.tasks = [...rest];
            this.store$.next(board);
          }
        }
      })
    );
  }

  // getComments$(_id: string): Observable<IComment[]> {
  //   const c$ = this.http.get<IComment[]>(`/api/task/${_id}/comments`);
  //   return c$;
  // }

  addComment$(payload: Omit<IComment, '_id'>): Observable<IComment> {
    const c$ = this.http.post<IComment>(`/api/comment`, payload);
    return c$;
  }

  updateComment$(
    _id: string,
    payload: Partial<IComment>
  ): Observable<IComment> {
    const c$ = this.http.patch<IComment>(`/api/comment/${_id}`, payload);
    return c$;
  }

  removeComment$(_id: string): Observable<IComment> {
    const c$ = this.http.delete<IComment>(`/api/comment/${_id}`);
    return c$;
  }

  // getLikes$(taskId: string): Observable<ILike[]> {
  //   const c$ = this.http.get<ILike[]>(`/api/task/${taskId}/likes`);
  //   return c$;
  // }

  addLike$(payload: ILike): Observable<ILike> {
    const c$ = this.http.post<ILike>(`/api/like`, payload);
    return c$;
  }

  removeLike$(payload: ILike): Observable<ILike> {
    const c$ = this.http.post<ILike>(`/api/like/remove`, payload);
    return c$;
  }
}
