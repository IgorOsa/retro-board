import { Injectable } from '@angular/core';
import { IColumn } from '@retro-board/api-interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  columns: IColumn[] = [
    {
      title: 'backlog',
      tasks: [
        {
          id: '1',
          title: 'Get to work',
          likes: [{ userId: '1' }, { userId: '2' }],
          comments: [{ text: 'Good' }, { text: 'Great' }],
        },
        {
          id: '2',
          title: 'Pick up groceries',
          likes: [],
          comments: [{ text: 'So so' }, { text: 'Not Bad' }],
        },
        {
          id: '3',
          title: 'Fall asleep',
          likes: [{ userId: '1' }, { userId: '2' }, { userId: '3' }],
          comments: [{ text: 'Normal' }],
        },
        { id: '4', title: 'Have some fun', likes: [], comments: [] },
      ],
    },
    {
      title: 'todo',
      tasks: [{ title: 'Go home' }, { title: 'Fall asleep' }],
    },
    {
      title: 'done',
      tasks: [
        { title: 'Pick up groceries' },
        { title: 'Go home' },
        { title: 'Have some fun' },
      ],
    },
  ];

  constructor() {}

  getColumns$() {
    return of(this.columns);
  }
}
