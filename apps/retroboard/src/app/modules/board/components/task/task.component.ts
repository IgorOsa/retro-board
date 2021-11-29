import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IComment, ITask } from '@retro-board/api-interfaces';
import { UserService } from '../../../user/services/user.service';
import { BoardService } from '../../services/board.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'retro-board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public isLoading = false;
  public showCommentForm = false;
  public comments: IComment[] = [];
  @Input() task!: ITask;
  @Output() removeTaskEvent = new EventEmitter();

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.boardService.getComments$(this.task._id).subscribe((data) => {
      this.comments = data;
      this.isLoading = false;
    });
  }

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
    const comment = { text, userId, taskId: this.task._id };
    this.boardService.addComment$(comment).subscribe(() => {
      this.comments.push(comment);
    });
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }

  setLoading(event: boolean) {
    this.isLoading = event;
  }
}
