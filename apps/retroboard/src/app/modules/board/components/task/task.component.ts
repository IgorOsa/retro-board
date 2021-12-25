import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  IComment,
  ITaskWithCommentsAndLikes,
} from '@retro-board/api-interfaces';
import { UserService } from '../../../user/services/user.service';
import { BoardService } from '../../services/board.service';
import { ConfirmDialogComponent } from '../../../../shared/components';

@Component({
  selector: 'retro-board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public isLoading = false;
  public showCommentForm = false;
  public comments!: IComment[];
  public userName!: string;

  @Input() task!: ITaskWithCommentsAndLikes;
  @Output() public openEditDialog = new EventEmitter();
  @Output() removeTaskEvent = new EventEmitter();

  constructor(
    private userService: UserService,
    private boardService: BoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.comments = this.task.comments || [];

    if (this.task.userId && !this.task.userName) {
      this.isLoading = true;
      this.userService.getUserById$(this.task.userId).subscribe((u) => {
        this.task.userName = `${u.firstName} ${u.lastName}`;
        this.isLoading = false;
      });
    }
  }

  openDeleteDialog(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: 'Remove task?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeTaskEvent.emit(_id);
      }
    });
  }

  addComment(text: string): void {
    const userId = this.userService.store$.value._id;
    const comment = { text, userId, taskId: this.task._id };
    const userName = this.userService.getCurrentUserName();

    this.boardService.addComment$(comment).subscribe((c) => {
      this.comments.push({ ...c, userName });
    });
  }

  commentsChange(event: IComment[]): void {
    this.comments = event;
  }

  toggleCommentForm(): void {
    this.showCommentForm = !this.showCommentForm;
  }

  setLoading(event: boolean): void {
    this.isLoading = event;
  }
}
