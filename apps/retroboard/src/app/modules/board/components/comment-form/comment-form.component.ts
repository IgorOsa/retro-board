import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Component,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'retro-board-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  public commentInput = '';
  @Output() submitCommentEvent = new EventEmitter();
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) {}

  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submit() {
    if (!this.commentInput) {
      return;
    }
    this.submitCommentEvent.emit(this.commentInput);
    this.commentInput = '';
  }
}
