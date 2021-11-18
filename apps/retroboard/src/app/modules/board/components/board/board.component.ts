import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { delay } from 'rxjs/operators';
import { IColumn } from '@retro-board/api-interfaces';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

type dialogAction = 'column' | 'task';

@Component({
  selector: 'retro-board-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  isLoading = true;
  columns: IColumn[] = [];

  constructor(private boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.boardService
      .getColumns$()
      .pipe(delay(500))
      .subscribe((data): void => {
        this.columns = data.columns || [];
        this.isLoading = false;
      });
  }

  drop(event: CdkDragDrop<IColumn>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openDialog(dialogTitle: string, action: dialogAction, data: any = {}): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { dialogTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (action) {
          case 'column':
            this.addColumn(result);
            break;
          case 'task':
            this.addTask(result, data?.column);
            break;
          default:
            break;
        }
      }
    });
  }

  addColumn(title: string) {
    console.log('addColumn', this.columns);
    this.columns.push({ title, tasks: [] });
  }

  addTask(title: string, column: IColumn) {
    console.log('addTask', this.columns);
    column.tasks.push({ title });
  }

  like(taskId: string | undefined) {
    console.log('like', taskId);
  }

  comment(taskId: string | undefined) {
    console.log('comment', taskId);
  }
}
