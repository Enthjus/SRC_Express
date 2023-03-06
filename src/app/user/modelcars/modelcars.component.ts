import { Component, OnInit } from '@angular/core';
import { ActiveTrips } from 'src/app/model/activetrips.model';
import { ActiveTripsService } from 'src/app/services/activetrips.service';

@Component({
  selector: 'app-modelcars',
  templateUrl: './modelcars.component.html',
})
export class ModelcarsComponent implements OnInit {
  fullname_user :string = null;
  activetriplist:ActiveTrips[]
  constructor(
    private activetripAPI:ActiveTripsService
  ) { }

  ngOnInit(): void {
    this.fullname_user = sessionStorage.getItem("fullname");
    this.activetripAPI.findActiveTripForPage().then(res=>{
      this.activetriplist = res;
    },err=>{
      alert("Error: Loadding Data or Connection")
    });
  }
  logout() {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("fullname");
   this.fullname_user = null;
}
}
