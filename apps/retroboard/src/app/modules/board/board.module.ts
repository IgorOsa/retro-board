import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../../shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [BoardComponent, DialogComponent, ColumnComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule],
  exports: [BoardComponent],
})
export class BoardModule {}
