import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from '../login/login.component';
import { AccountComponent } from './account/account.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
