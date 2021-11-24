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
  public isLoading = true;

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
        next: () => {
          this.column.tasks.push({
            title,
            columnId: this.column._id,
            order: nextOrder,
            likes: [],
            comments: [],
          });
        },
        error: undefined,
        complete: () => this.snackbarService.open('Task created'),
      });
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  comment(taskId: string | undefined) {
    console.log('comment', taskId);
  }
}
