import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, IColumn, ITask } from '@retro-board/api-interfaces';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { catchError, debounceTime, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public store$ = new BehaviorSubject<IBoard>({
    _id: '6197e48265c7a3830f70c880',
    title: 'Demo board',
  });

  constructor(private readonly http: HttpClient) {}

  getFullBoard$() {
    forkJoin([this.getBoard$(), this.getColumns$()])
      .pipe(
        debounceTime(500),
        retry(3),
        catchError(this.handleError),
        map((data) => ({
          ...data[0],
          columns: data[1].map((el) => {
            if (el?._id) {
              this.getTasks$(el._id).subscribe((t) => {
                el.tasks = t;
              });
            }
            return el;
          }),
        }))
      )
      .subscribe({
        next: (board) => {
          this.store$.next(board);
        },
        error: undefined,
        complete: () => console.log('Board is loaded: ', this.store$.value),
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

  addColumn$(payload: IColumn): Observable<IColumn> {
    const c$ = this.http.post<IColumn>('/api/column', payload);

    return c$;
  }

  getTasks$(columnId: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/column/${columnId}/tasks`);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
