import { Component, Input } from '@angular/core';

@Component({
  selector: 'retro-board-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() title!: string;
}
