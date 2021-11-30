import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from '@retro-board/api-interfaces';
import {UserService} from '../../../user/services/user.service';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'retro-board-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment!: IComment;
  @Output() removeCommentEvent = new EventEmitter();
  userName!: string;

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getUserById$(this.comment.userId).subscribe((u) => {
      this.userName = `${u.firstName} ${u.lastName}`;
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
