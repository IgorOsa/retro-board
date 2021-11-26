import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UserModule {}
