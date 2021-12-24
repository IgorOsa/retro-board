import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IBoard, IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SnackbarService } from '../../../../core/services';
import { UserService } from '../../../user/services/user.service';

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
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.setCurrentUser();
    this.boardService
      .getFullBoard$()
      .pipe(delay(500))
      .subscribe((board) => {
        this.board = board;
        this.isLoading = false;
      });
  }

  openDialog(
    dialogTitle: string,
    dialogAction = 'Create',
    entityTitle = '',
    entityId = ''
  ): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '250px',
      data: { dialogTitle, dialogAction, entityTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (dialogAction) {
          case 'Create':
            this.addColumn(result);
            break;
          case 'Update':
            this.editColumn(entityId, result);
            break;
        }
      }
    });
  }

  addColumn(title: string) {
    this.boardService
      .addColumn$({
        boardId: this.board._id,
        title,
      })
      .subscribe(() => {
        this.snackbarService.open('Column created');
      });
  }

  editColumn(_id: string, title: string) {
    this.boardService
      .updateColumn$(_id, {
        title,
        boardId: this.board._id,
      })
      .subscribe(() => {
        this.snackbarService.open('Column updated');
      });
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

  removeColumn(_id: string) {
    this.boardService.removeColumn$(_id).subscribe(() => {
      this.snackbarService.open('Column deleted');
    });
  }
}
