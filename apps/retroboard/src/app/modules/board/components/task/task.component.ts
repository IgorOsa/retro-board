import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'retro-board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  public showCommentForm = false;
  @Input() task!: ITask;
  @Output() removeTaskEvent = new EventEmitter();

  constructor(private boardService: BoardService, public dialog: MatDialog) {}

  openDeleteDialog(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeTaskEvent.emit(_id);
      }
    });
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  addComment(text: string) {
    const comment = { text };
    this.boardService.addComment$(this.task._id, comment).subscribe(() => {
      this.task.comments.push(comment);
    });
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }
}
