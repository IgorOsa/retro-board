import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILike, ITaskWithCommentsAndLikes } from '@retro-board/api-interfaces';
import { UserService } from '../../../user/services/user.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'retro-board-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Output() isLoading = new EventEmitter();
  @Input() taskId!: string;
  @Input() task!: ITaskWithCommentsAndLikes;
  public likes: ILike[] = [];

  constructor(
    private userService: UserService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.likes = this.task.likes || [];
  }

  like(): void {
    this.isLoading.emit(true);
    const userId = this.userService.store$.value._id;
    const like = { taskId: this.taskId, userId };
    this.boardService.addLike$(like).subscribe((data) => {
      this.likes.push(data);
      this.isLoading.emit(false);
    });
  }

  dislike(): void {
    this.isLoading.emit(true);
    const userId = this.userService.store$.value._id;
    const like = { taskId: this.taskId, userId };
    this.boardService.removeLike$(like).subscribe((data) => {
      this.likes = this.likes.filter((el) => el._id !== data._id);
      this.isLoading.emit(false);
    });
  }
}
