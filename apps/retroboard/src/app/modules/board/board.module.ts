import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../../shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ColumnComponent } from './components/column/column.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { TaskComponent } from './components/task/task.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LikeComponent } from './components/like/like.component';
import { CommentButtonComponent } from './components/comment-button/comment-button.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { ExportComponent } from './components/export/export.component';

@NgModule({
  declarations: [
    BoardComponent,
    DialogComponent,
    ColumnComponent,
    ConfirmDialogComponent,
    CommentFormComponent,
    TaskComponent,
    CommentsComponent,
    LikeComponent,
    CommentButtonComponent,
    CommentItemComponent,
    MenuComponent,
    ExportComponent,
  ],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
  exports: [BoardComponent, ExportComponent],
})
export class BoardModule {}
