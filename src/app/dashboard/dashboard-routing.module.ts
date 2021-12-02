import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'', 
    component: DashboardComponent,
    children:[
      {path: '', component: RegisterComponent},
      {path: '**', redirectTo: ''}
    ]
  },
  {
    path:'**', 
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
