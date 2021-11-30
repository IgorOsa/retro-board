import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'retro-board-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() entityId!: string;
  @Output() openDeleteDialog = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
