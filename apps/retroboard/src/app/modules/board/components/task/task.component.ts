import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '@retro-board/api-interfaces';
import { UserService } from '../../../user/services/user.service';
import { BoardService } from '../../services/board.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'retro-board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  public isLoading = false;
  public showCommentForm = false;
  @Input() task!: ITask;
  @Output() removeTaskEvent = new EventEmitter();

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    public dialog: MatDialog
  ) {}

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

  addComment(text: string) {
    const userId = this.userService.store$.value._id;
    const comment = { text, userId };
    this.boardService.addComment$(this.task._id, comment).subscribe(() => {
      // this.task.comments.push(comment);
    });
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }

  setLoading(event: boolean) {
    this.isLoading = event;
  }
}
