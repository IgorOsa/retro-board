import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'board',
    loadChildren: () =>
      import('./modules/board/board.module').then((m) => m.BoardModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canLoad: [AuthGuard],
  },
  { path: 'register', redirectTo: 'user/register' },
  { path: 'login', redirectTo: 'user/login' },
  {
    path: '',
    redirectTo: '/board',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
