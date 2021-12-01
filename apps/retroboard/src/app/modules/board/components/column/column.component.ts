import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SnackbarService } from '../../../../shared/services';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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

  openDialog(dialogTitle: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '250px',
      data: { dialogTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTask(result);
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
        next: (el) => {
          this.column.tasks.push({
            _id: el._id,
            title,
            columnId: this.column._id,
            order: nextOrder,
            userId,
          });
        },
        error: undefined,
        complete: () => this.snackbarService.open('Task created'),
      });
  }

  removeTaskEvent(_id: string) {
    this.removeTask(_id);
  }

  removeTask(_id: string) {
    this.boardService.removeTask$(_id).subscribe((data) => {
      if (data) {
        const rest = this.column.tasks.filter((item) => item._id !== _id);
        this.column.tasks = [...rest];
        this.snackbarService.open('Task deleted');
      }
    });
  }
}
