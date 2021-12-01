import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'retro-board-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() entityId!: string;
  @Output() openEditDialog = new EventEmitter();
  @Output() openDeleteDialog = new EventEmitter();
}
