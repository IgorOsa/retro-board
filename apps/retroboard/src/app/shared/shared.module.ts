import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FooterComponent, HeaderComponent, MaterialModule, LoaderComponent],
})
export class SharedModule {}
