import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IComment } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { SnackbarService } from '../../../../core/services';

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

  removeComment(_id: string): void {
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
