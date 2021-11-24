import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, IColumn, ITask } from '@retro-board/api-interfaces';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { debounceTime, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public store$ = new BehaviorSubject<IBoard>({
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
}
