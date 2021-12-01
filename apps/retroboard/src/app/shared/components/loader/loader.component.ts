import { Component, Input } from '@angular/core';

@Component({
  selector: 'retro-board-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() diameter: number | string = 100;
}
