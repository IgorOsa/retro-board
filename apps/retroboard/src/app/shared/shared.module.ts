import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorPipe } from './pipes/validator/validator.pipe';

@NgModule({
  declarations: [ConfirmDialogComponent, LoaderComponent, ValidatorPipe],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    MaterialModule,
    LoaderComponent,
    ReactiveFormsModule,
    ValidatorPipe,
  ],
})
export class SharedModule {}
