import { Component, OnInit } from '@angular/core';
import { IBoard, IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { dialogAction } from '../dialog/dialog.model';
import { delay } from 'rxjs/operators';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'retro-board-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  isLoading = true;
  board!: IBoard;

  constructor(private boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.boardService
      .getFullBoard$()
      .pipe(delay(500))
      .subscribe((board) => {
        this.board = board;
        this.isLoading = false;
      });
  }

  openDialog(dialogTitle: string, action: dialogAction): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { dialogTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (action) {
          case 'column':
            this.addColumn(result);
            break;
          case 'task':
            this.addTask(result);
            break;
          default:
            break;
        }
      }
    });
  }

  addColumn(title: string) {
    console.log('addColumn', this.board.columns);
    this.board.columns?.push({ title, boardId: '' });
  }

  addTask(title: string) {
    console.log('addTask', title);
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  comment(taskId: string | undefined) {
    console.log('comment', taskId);
  }

  drop(event: CdkDragDrop<IColumn>): void {
    console.log(event);

    if (event.previousContainer === event.container) {
      if (event.container.data?.tasks) {
        moveItemInArray(
          event.container.data.tasks,
          event.previousIndex,
          event.currentIndex
        );
        //TODO Make API call to update
      }
    } else {
      if (event.previousContainer.data?.tasks && event.container.data?.tasks) {
        transferArrayItem(
          event.previousContainer.data.tasks,
          event.container.data.tasks,
          event.previousIndex,
          event.currentIndex
        );
        //TODO Make API call to update
      }
    }
  }
}
