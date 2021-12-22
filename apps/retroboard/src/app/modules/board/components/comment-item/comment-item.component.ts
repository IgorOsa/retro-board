import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from '@retro-board/api-interfaces';
import { UserService } from '../../../user/services/user.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'retro-board-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() public comment!: IComment;
  @Output() public openEditDialog = new EventEmitter();
  @Output() public removeCommentEvent = new EventEmitter();
  public userName!: string;

  constructor(
    private boardService: BoardService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUserById$(this.comment.userId).subscribe((u) => {
      this.userName = `${u.firstName} ${u.lastName}`;
    });
  }

  editComment(_id: string, payload: Partial<IComment>) {
    this.boardService.updateComment$(_id, payload).subscribe((c) => {
      this.comment.text = c.text;
    });
  }

  openDialog(
    dialogTitle: string,
    dialogAction = 'Update',
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
          case 'Update':
            this.editComment(entityId, { text: result });
            break;
        }
      }
    });
  }

  openDeleteDialog(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      restoreFocus: false,
      data: 'Remove comment?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeCommentEvent.emit(_id);
      }
    });
  }
}
