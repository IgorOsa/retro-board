import { Component, Input } from '@angular/core';

@Component({
  selector: 'retro-board-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
}
