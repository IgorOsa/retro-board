import { Component, OnInit } from '@angular/core';
import { IBoard, IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { delay } from 'rxjs/operators';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SnackbarService } from '../../../../shared/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'retro-board-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  isLoading = true;
  board!: IBoard;

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.boardService
      .getFullBoard$()
      .pipe(delay(500))
      .subscribe((board) => {
        this.board = board;
        this.isLoading = false;
      });
  }

  openDialog(dialogTitle: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { dialogTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addColumn(result);
      }
    });
  }

  addColumn(title: string) {
    this.boardService
      .addColumn$({
        boardId: this.board._id,
        title,
      })
      .subscribe((res) => {
        this.board.columns.push({
          _id: res._id,
          title,
          boardId: this.board._id,
          tasks: [],
        });
        this.snackbarService.open('Column created');
      });
  }

  like(taskId: string) {
    console.log('like', taskId);
  }

  comment(taskId: string) {
    console.log('comment', taskId);
  }

  drop(event: CdkDragDrop<IColumn>): void {
    if (event.previousContainer === event.container) {
      if (event.previousIndex !== event.currentIndex) {
        const entityToUpdate1 = event.container.data.tasks[event.previousIndex];
        const entityToUpdate2 = event.container.data.tasks[event.currentIndex];
        const payload1 = { ...entityToUpdate1, order: event.currentIndex };
        const payload2 = { ...entityToUpdate2, order: event.previousIndex };

        forkJoin([
          this.boardService.updateTask$(entityToUpdate1._id, payload1),
          this.boardService.updateTask$(entityToUpdate2._id, payload2),
        ]).subscribe(() => {
          this.snackbarService.open('Tasks order updated');
        });

        moveItemInArray(
          event.container.data.tasks,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      const entityToUpdate1 =
        event.previousContainer.data.tasks[event.previousIndex];
      const payload1 = {
        ...entityToUpdate1,
        order: event.currentIndex,
        columnId: event.container.data._id,
      };

      this.boardService
        .updateTask$(entityToUpdate1._id, payload1)
        .subscribe(() => {
          this.snackbarService.open('Tasks order updated');
        });

      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
