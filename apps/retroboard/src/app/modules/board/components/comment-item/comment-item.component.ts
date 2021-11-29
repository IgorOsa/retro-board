import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '@retro-board/api-interfaces';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'retro-board-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment!: IComment;
  userName!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById$(this.comment.userId).subscribe((u) => {
      this.userName = `${u.firstName} ${u.lastName}`;
    });
  }
}
