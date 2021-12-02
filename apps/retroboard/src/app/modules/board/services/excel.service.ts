import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IColumn } from '@retro-board/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(columns: IColumn[], excelFileName: string): void {
    const board: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      columns.map((c) => {
        const { tasks, ...rest } = c;
        return rest;
      })
    );

    let colSheets = {};
    const colNames = [];

    for (let i = 0; i < columns.length; i++) {
      const column: XLSX.WorkSheet = XLSX.utils.json_to_sheet(columns[i].tasks);
      const name = columns[i].title;
      colNames.push(name);
      colSheets = Object.assign(colSheets, { [name]: column });
    }

    const workbook: XLSX.WorkBook = {
      Sheets: { board, ...colSheets },
      SheetNames: ['board', ...colNames],
    };
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
}
