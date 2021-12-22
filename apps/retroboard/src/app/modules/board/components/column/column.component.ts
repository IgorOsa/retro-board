import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SnackbarService } from '../../../../core/services';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'retro-board-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: IColumn;
  @Output() public dropped = new EventEmitter();
  @Output() public openedDialog = new EventEmitter();
  @Output() public openEditDialog = new EventEmitter();
  @Output() public removeColumnEvent = new EventEmitter();

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {}

  drop(event: CdkDragDrop<IColumn>): void {
    this.dropped.emit(event);
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
            this.addTask(result);
            break;
          case 'Update':
            this.editTask(entityId, result);
            break;
          default:
            break;
        }
      }
    });
  }

  openDeleteDialog(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: 'Remove column?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeColumnEvent.emit(_id);
      }
    });
  }

  addTask(title: string) {
    const nextOrder = this.column.tasks.length;
    const userId = this.userService.store$.value._id;

    this.boardService
      .addTask$({
        columnId: this.column._id,
        title,
        order: nextOrder,
        userId,
      })
      .subscribe({
        complete: () => this.snackbarService.open('Task created'),
      });
  }

  editTask(_id: string, title: string) {
    this.boardService
      .updateTask$(_id, {
        title,
      })
      .subscribe({ complete: () => this.snackbarService.open('Task updated') });
  }

  removeTaskEvent(_id: string) {
    this.removeTask(_id);
  }

  removeTask(_id: string) {
    this.boardService.removeTask$(_id).subscribe({
      complete: () => {
        this.snackbarService.open('Task deleted');
      },
    });
  }
}
