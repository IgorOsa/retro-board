import { Component } from '@angular/core';
import { ExcelService } from '../../services/excel.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'retro-board-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  constructor(
    private excelService: ExcelService,
    private boardService: BoardService
  ) {}

  exportToExcel() {
    this.excelService.exportAsExcelFile(
      this.boardService.store$.value.columns,
      'retro-board'
    );
  }
}
