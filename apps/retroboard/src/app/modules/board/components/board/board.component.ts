import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { delay } from 'rxjs/operators';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'retro-board-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  isLoading = true;
  columns: IColumn[] = [];

  constructor(boardService: BoardService) {
    boardService
      .getColumns$()
      .pipe(delay(500))
      .subscribe((data) => {
        this.columns = data;
        this.isLoading = false;
      });
  }

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

  addColumn() {
    console.log('addColumn');
    this.columns.push({ title: 'Added column', tasks: [] });
  }

  addTask(column: IColumn) {
    console.log('addTask');
    column.tasks.push({ title: 'Added task' });
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  comment(taskId: string | undefined) {
    console.log('comment', taskId);
  }
}
