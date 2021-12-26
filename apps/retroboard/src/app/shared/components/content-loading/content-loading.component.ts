import { Component, Input } from '@angular/core';

@Component({
  selector: 'retro-board-content-loading',
  templateUrl: './content-loading.component.html',
  styleUrls: ['./content-loading.component.scss'],
})
export class ContentLoadingComponent {
  @Input() height = '16';
}
