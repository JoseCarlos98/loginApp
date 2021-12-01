import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ListadoComponent } from './listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { BranchPipe } from './pipe/branch.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    RegisterComponent,
    ListadoComponent,
    DateFormatPipe,
    BranchPipe

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class DashboardModule { }
