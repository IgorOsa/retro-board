import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorPipe } from './pipes/validator/validator.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ValidatorPipe,
  ],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  exports: [
    FooterComponent,
    FormsModule,
    HeaderComponent,
    MaterialModule,
    LoaderComponent,
    ReactiveFormsModule,
    ValidatorPipe,
  ],
})
export class SharedModule {}
