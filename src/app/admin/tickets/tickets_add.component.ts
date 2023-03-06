
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveTrips } from 'src/app/model/activetrips.model';
import { ActiveTripsService } from 'src/app/services/activetrips.service';
import { TicketService } from 'src/app/services/ticket.service';
import { DatePipe } from '@angular/common'
import { Seats } from 'src/app/model/seats.model';
import { TicketAPI } from 'src/app/model/ticketAPI.model';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets_add.component.html',
})
export class AddTicketsComponent implements OnInit {
  fullnameUser: string;
  tripActive: ActiveTrips[];
  idActivetripSelected: number;
  idTypeCarSelect: number;
  age: number;
  Totaltam: number;
  startdate: Date;
  seatsList: Seats[];
  seatSelected: string;
  tripcreate: ActiveTrips;
  check:boolean;
  constructor(
    private ticketService: TicketService,
    private activetripService: ActiveTripsService,
    private router: Router,
    private datepipe: DatePipe,
    private jwtHelper: JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.idActivetripSelected = 0;
    this.idTypeCarSelect = 0;
    this.Totaltam = 0;
    this.startdate = new Date(Date.now());
    this.age = 1;
    this.check = false;
  }

  changeTypeCar(e: any) {
    this.check = false
    this.idTypeCarSelect = e.target.value;
    this.idActivetripSelected = e.target.value;
    this.seatsList = null;
    this.seatSelected = "";
    this.activetripService.findAllActivetripHasActiveWithTYPECAR(this.idTypeCarSelect).then(res => {
      if (res.length == 0) {
        this.idActivetripSelected = 0;
        this.idTypeCarSelect = 0;
        this.check = false
        this.tripActive = null;
        this.seatsList = null;
        alert("nothing trip has car this type");
      } else {
        this.tripActive = res;
        this.tripActive.sort((a, b) => a.trip.nameTrip.localeCompare(b.trip.nameTrip));
      }
    }, err => {
      alert("Error Loading Data or Connection !!")
    });
  }

  changeTrip(e: any) {
    this.check =  false;
    this.seatSelected = "";
    this.idActivetripSelected = e.target.value;
    this.seatsList=null;
    var now = new Date(Date.now());
    if (this.startdate.getDate() > now.getDate() && this.startdate.getMonth() == now.getMonth() && this.startdate.getFullYear() == now.getFullYear()) {
      var d = this.startdate.getDate();
      var m  = this.startdate.getMonth() + 1;
      var y = this.startdate.getFullYear() ;
      this.ticketService.getListSeats(this.idActivetripSelected,d,m,y).then(
        res => {
          this.seatsList = res;
        }, err => {
          alert("Error Loading Data or Connection !!")
        });
    }else{
      this.idActivetripSelected = 0;
      alert("plss choose your date start")
    }
    

  }

  changeAge(e: any) {
    this.check = false;
    this.age = e.target.value;
  }

  changeSeat(e: any) {
  
    this.seatSelected = e.target.value;
    
  }

  GetTotalTam() {
    if (this.idActivetripSelected != 0) {
      if(this.age>=1 && this.age <=200){
        this.check = true;
        this.ticketService.getTotalTam(this.idActivetripSelected, this.age).then(res => {
          this.Totaltam = res;
        }, err => {
          alert("Error Loading Data or Connection !!")
        });
      }else{
        alert("Age is invalid")
      }
     
    }else{
      alert("choose trip and age plsss")
    }
    

    
  }

  Submit() {
    var now = new Date(Date.now());
    if (this.startdate.getDate() > now.getDate() && this.startdate.getMonth() == now.getMonth() && this.startdate.getFullYear() == now.getFullYear()) {
      if (this.idActivetripSelected != 0 && this.check==true && this.seatSelected != "") {

        var token: string = sessionStorage.getItem("jwt");
        var decodedToken = this.jwtHelper.decodeToken(token);
        var startdate = this.datepipe.transform(this.startdate, 'yyyy-MM-dd');
        var createdate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
        this.activetripService.findActiveTrip(this.idActivetripSelected).then(res => {
          this.tripcreate = res;
          var ticketCreate = new TicketAPI;
          ticketCreate.fromAddress = this.tripcreate.trip.fromAddress;
          ticketCreate.toAddress = this.tripcreate.trip.toAddress;
          ticketCreate.idAccCustomer = decodedToken.Id;
          ticketCreate.total = this.Totaltam;
          ticketCreate.createDate = createdate + "T00:00:00";
          ticketCreate.creater = decodedToken.Id;
          ticketCreate.startDate = startdate + "T00:00:00";
          ticketCreate.age = this.age;
          ticketCreate.idactiveTrip = this.idActivetripSelected;
          ticketCreate.seats = this.seatSelected
          this.ticketService.create(ticketCreate).then(res => {
            alert("Success: checkmail plsss")
          }, err => {
            alert("Errorrrrrrrr!!")
          });
        }, err => {
          alert("Error Loading Data or Connection !!")
        });
      }else{
        alert("plsssssss input and click check total first!!")
      }

    } else {
      alert("Start date is invaild !!")
    }
  }


  parseDate(dateString: any): Date {
    dateString = dateString.target.value;
    if (dateString) {
     
      var d = new Date(dateString);
      this.startdate = d;
      
      return d;
    }
    return null;
  }
}
