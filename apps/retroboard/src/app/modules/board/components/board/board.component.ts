import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface ITask {
  id?: string;
  title: string;
  likes?: Array<{
    userId: string;
  }>;
  comments?: string[];
}

export interface IColumn {
  title: string;
  tasks: ITask[];
}

@Component({
  selector: 'retro-board-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  columns: IColumn[] = [
    {
      title: 'backlog',
      tasks: [
        {
          title: 'Get to work',
          likes: [{ userId: '1' }, { userId: '2' }],
          comments: ['Good', 'Great'],
        },
        {
          title: 'Pick up groceries',
          likes: [],
          comments: ['So so', 'Not Bad'],
        },
        {
          title: 'Fall asleep',
          likes: [{ userId: '1' }, { userId: '2' }, { userId: '3' }],
          comments: ['Normal'],
        },
        { title: 'Have some fun', likes: [], comments: [] },
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

  drop(event: CdkDragDrop<IColumn>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
