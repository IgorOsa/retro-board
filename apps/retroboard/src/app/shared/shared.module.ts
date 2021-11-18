import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [
    FooterComponent,
    FormsModule,
    HeaderComponent,
    MaterialModule,
    LoaderComponent,
  ],
})
export class SharedModule {}
