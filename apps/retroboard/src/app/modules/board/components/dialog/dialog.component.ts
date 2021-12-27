import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dialogTitle: string;
  entityTitle: string;
  dialogAction: string;
}

@Component({
  selector: 'retro-board-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public changed = false;
  public oldValue = this.data.entityTitle;

  constructor(
    public dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleInputChange(event: Event): void {
    this.changed = (event.target as HTMLInputElement).value !== this.oldValue;
  }
}
