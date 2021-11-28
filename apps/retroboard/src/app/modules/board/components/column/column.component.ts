import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SnackbarService } from '../../../../shared/services';

@Component({
  selector: 'retro-board-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: IColumn;
  @Output() public dropped = new EventEmitter();
  @Output() public openedDialog = new EventEmitter();

  constructor(
    private boardService: BoardService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
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

  addTask(title: string) {
    const nextOrder = this.column.tasks.length;

    this.boardService
      .addTask$({
        columnId: this.column._id,
        title,
        order: nextOrder,
      })
      .subscribe({
        next: (el) => {
          this.column.tasks.push({
            _id: el._id,
            title,
            columnId: this.column._id,
            order: nextOrder,
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
