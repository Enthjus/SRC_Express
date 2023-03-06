import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

import {UserRoutingModule} from './user/user-routing.module';
import {AdminRoutingModule} from './admin/admin-routing.module';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './user/category/category.component';
import { ModelcarsComponent } from './user/modelcars/modelcars.component';
import { PricedetailsComponent } from './user/pricedetails/pricedetails.component';
import { BookingComponent } from './user/booking/booking.component';
import { ContactusComponent } from './user/contactus/contactus.component';
//import admin
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
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './services/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarService } from './services/car.service';
import { TripService } from './services/trip.service';
import { PricePerKmService } from './services/priceperkm.service';
import { PercentByAgeService } from './services/percentbyage.service';
import { RefundService } from './services/refund.service';
import { TableAccountFilterPipe } from './admin/table_filter/tableAccount-filter.pipe';
import { TableCarsFilterPipe } from './admin/table_filter/tableCar-filter.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guard/auth-guard.service';
import { ActivetripsComponent } from './admin/activetrips/activetrips.component';
import { ActiveTripsService } from './services/activetrips.service';
import { AddActivetripsComponent } from './admin/activetrips/activetrips_add.component';




import { TicketService } from './services/ticket.service';


export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    CategoryComponent,
    ModelcarsComponent,
    PricedetailsComponent,
    BookingComponent,
    ContactusComponent,
    AccountComponent,
    AddAccountComponent,
    EditAccountComponent,
    PriceAgeComponent,
    AddPriceAgeComponent,
    EditPriceAgeComponent,
    PricePerKmComponent,
    EditPricePerKmComponent,
    TripsComponent,
    AddTripsComponent,
    EditTripsComponent,
    CarsComponent,
    AddCarsComponent,
    EditCarsComponent,
    TicketsComponent,
    AddTicketsComponent,
    EditTicketsComponent,
    RefundComponent,
    RequestRefundComponent,
    EditRefundComponent,
    TableAccountFilterPipe,
    TableCarsFilterPipe,
    ActivetripsComponent,
    AddActivetripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule, // ngModel - data bindding
    ReactiveFormsModule,   // form - thu vien de khai bao form ng
    JwtModule.forRoot({       // route guard
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:["localhost:4200"],
        disallowedRoutes:[],
      }
    }),
 
  ],
  providers: [
    AccountService,
    CarService,
    TripService,
    PricePerKmService,
    PercentByAgeService,
    RefundService,
    ActiveTripsService,
    TicketService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
