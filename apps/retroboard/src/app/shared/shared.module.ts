import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxContentLoadingModule } from 'ngx-content-loading';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ValidatorPipe } from './pipes/validator/validator.pipe';
import { ContentLoadingComponent } from './components/content-loading/content-loading.component';

@NgModule({
  declarations: [
    ContentLoadingComponent,
    ConfirmDialogComponent,
    LoaderComponent,
    ValidatorPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxContentLoadingModule,
    ReactiveFormsModule,
  ],
  exports: [
    ContentLoadingComponent,
    FormsModule,
    LoaderComponent,
    MaterialModule,
    NgxContentLoadingModule,
    ReactiveFormsModule,
    ValidatorPipe,
  ],
})
export class SharedModule {}
