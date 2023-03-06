import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserComponent} from './user/user.component';
import {HomeComponent} from './user/home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent } from './register/register.component';
import {CategoryComponent} from './user/category/category.component';
import {ModelcarsComponent } from './user/modelcars/modelcars.component';
import {PricedetailsComponent } from './user/pricedetails/pricedetails.component';
import { BookingComponent } from './user/booking/booking.component';
import { ContactusComponent } from './user/contactus/contactus.component';
//import admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AccountComponent } from './admin/account/account.component';
import { AddAccountComponent } from './admin/account/account_add.component';
import { EditAccountComponent } from './admin/account/account_edit.component';
import { PriceAgeComponent } from './admin/price_per_age/price_age.component';
import { AddPriceAgeComponent } from './admin/price_per_age/price_age_add.component';
import { EditPriceAgeComponent } from './admin/price_per_age/price_age_edit.component';
import { PricePerKmComponent } from './admin/price-per-km/price-per-km.component';
import { EditPricePerKmComponent } from './admin/price-per-km/price-per-km_edit.component';
import { TripsComponent } from './admin/trips/trips.component';
import { AddTripsComponent } from './admin/trips/trips_add.component';
import { EditTripsComponent } from './admin/trips/trips_edit.component';
import { CarsComponent } from './admin/cars/cars.component';
import { AddCarsComponent } from './admin/cars/cars_add.component';
import { EditCarsComponent } from './admin/cars/cars_edit.component';
import { TicketsComponent } from './admin/tickets/tickets.component';
import { AddTicketsComponent } from './admin/tickets/tickets_add.component';
import { EditTicketsComponent } from './admin/tickets/tickets_edit.component';
import { RefundComponent } from './admin/refund/refund.component';
import { RequestRefundComponent } from './admin/refund/request-refund.component';
import { EditRefundComponent } from './admin/refund/refund-edit.component';
import { AuthGuard } from './guard/auth-guard.service';
import { ActivetripsComponent } from './admin/activetrips/activetrips.component';
import { AddActivetripsComponent } from './admin/activetrips/activetrips_add.component';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'category',component:CategoryComponent},
  {path:'modelcars',component:ModelcarsComponent},
  {path:'pricedetails',component:PricedetailsComponent},
  {path:'booking',component:BookingComponent},
  {path:'contactus',component:ContactusComponent},

  {path:'admin/dashboard',component:DashboardComponent,canActivate:[AuthGuard]},

  {path:'admin/account',component:AccountComponent,canActivate:[AuthGuard]},
  {path:'admin/account/add',component:AddAccountComponent,canActivate:[AuthGuard]},
  {path:'admin/account/edit',component:EditAccountComponent,canActivate:[AuthGuard]},

  {path:'admin/account/priceage',component:PriceAgeComponent,canActivate:[AuthGuard]},
  {path:'admin/account/priceage/edit',component:EditPriceAgeComponent,canActivate:[AuthGuard]},

  {path:'admin/account/priceperkm',component:PricePerKmComponent,canActivate:[AuthGuard]},
  {path:'admin/account/priceperkm/edit',component:EditPricePerKmComponent,canActivate:[AuthGuard]},

  {path:'admin/trips',component:TripsComponent,canActivate:[AuthGuard]},
  {path:'admin/trips/add',component:AddTripsComponent,canActivate:[AuthGuard]},
  {path:'admin/trips/edit',component:EditTripsComponent,canActivate:[AuthGuard]}, 

  {path:'admin/cars',component:CarsComponent,canActivate:[AuthGuard]}, 
  {path:'admin/cars/add',component:AddCarsComponent,canActivate:[AuthGuard]}, 
  {path:'admin/cars/edit',component:EditCarsComponent,canActivate:[AuthGuard]}, 

  {path:'admin/tickets',component:TicketsComponent,canActivate:[AuthGuard]}, 
  {path:'admin/tickets/add',component:AddTicketsComponent,canActivate:[AuthGuard]}, 
  {path:'admin/tickets/edit',component:EditTicketsComponent,canActivate:[AuthGuard]}, 
  
  {path:'admin/refund',component:RefundComponent,canActivate:[AuthGuard]},
  {path:'admin/refund/request',component:RequestRefundComponent,canActivate:[AuthGuard]},
  {path:'admin/refund/edit',component:EditRefundComponent,canActivate:[AuthGuard]},

  {path:'admin/activetrips',component:ActivetripsComponent,canActivate:[AuthGuard]},
  {path:'admin/activetrips/add',component:AddActivetripsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
