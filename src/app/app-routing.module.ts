import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatetokenGuard } from './guards/validatetoken.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren : ()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren : ()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad    : [ValidatetokenGuard],
    canActivate: [ValidatetokenGuard]
  },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
