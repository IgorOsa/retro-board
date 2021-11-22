import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';

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

  openDialog(columnId: string | undefined): void {
    this.openedDialog.emit(columnId);
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  comment(taskId: string | undefined) {
    console.log('comment', taskId);
  }
}
