import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'retro-board-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Output() public submitDialog = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) public question: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
