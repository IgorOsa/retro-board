import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'retro-board-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.scss'],
})
export class CommentButtonComponent {
  @Input() public commentsLength!: number;
  @Output() toggleCommentForm = new EventEmitter();
}
