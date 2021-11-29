import { Component, Input } from '@angular/core';
import { IComment } from '@retro-board/api-interfaces';

@Component({
  selector: 'retro-board-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() taskId!: string;
  @Input() public comments!: IComment[];
}
