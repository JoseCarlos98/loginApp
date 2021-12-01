import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { BranchPipe } from './pipe/branch.pipe';
import { SearcherComponent } from './searcher/searcher.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RegisterComponent,
    DateFormatPipe,
    BranchPipe,
    SearcherComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class DashboardModule { }
