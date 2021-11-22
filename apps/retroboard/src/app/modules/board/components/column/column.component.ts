import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'retro-board-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: IColumn;
  @Output() public droped = new EventEmitter();
  @Output() public openedDialog = new EventEmitter();
  public isLoading = true;

  constructor(private boardService: BoardService, public dialog: MatDialog) {}

  drop(event: CdkDragDrop<IColumn>): void {
    this.droped.emit(event);
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
    this.boardService
      .addTask$({
        columnId: this.column._id,
        title,
      })
      .subscribe(() => {
        this.column.tasks.push({
          title,
          columnId: this.column._id,
          likes: [],
          comments: [],
        });
      });
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  comment(taskId: string | undefined) {
    console.log('comment', taskId);
  }
}
