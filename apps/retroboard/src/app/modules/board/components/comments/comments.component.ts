import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment } from '@retro-board/api-interfaces';
import { SnackbarService } from '../../../../core/services';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'retro-board-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() taskId!: string;
  @Input() public comments!: IComment[];
  @Output() commentsChange = new EventEmitter();

  constructor(
    private boardService: BoardService,
    private snackbarService: SnackbarService
  ) {}

  removeComment(_id: string) {
    this.boardService.removeComment$(_id).subscribe((data) => {
      if (data) {
        const rest = this.comments.filter((item) => item._id !== _id);
        this.comments = [...rest];
        this.commentsChange.emit(this.comments);
        this.snackbarService.open('Comment deleted');
      }
    });
  }
}
