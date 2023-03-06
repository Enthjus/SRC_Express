import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveTripsAPI } from 'src/app/model/activetripAPI.model';
import { ActiveTrips } from 'src/app/model/activetrips.model';
import { Car } from 'src/app/model/car.model';
import { TimeStartAPI } from 'src/app/model/timestartAPI.model';
import { Trip } from 'src/app/model/trip.model';
import { ActiveTripsService } from 'src/app/services/activetrips.service';

@Component({
  selector: 'app-activetrips',
  templateUrl: './activetrips_add.component.html',
})
export class AddActivetripsComponent implements OnInit {
  fullnameUser : string;
  trips:Trip[];
  idtrip:number=0;
  carsl : Car[];
  idcars :string="";
  timeStart:TimeStartAPI[];
  idtimeStart : number;
  status:number=0;
  db:any;

  constructor(
    private activetripService : ActiveTripsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.activetripService.findAllInfo().then(
      res => {
        this.db = JSON.parse(JSON.stringify(res));
        this.trips = this.db.trips;
        this.carsl = this.db.cars;
       // this.timeStart = this.db.timestarts;
        this.idtrip = this.trips[0].id;
        this.idcars = this.carsl[0].id;
       // this.idtimeStart = this.timeStart[0].id;
        this.status = 0;
  }, 
  err=>{
   console.log(err);
  },);
  }

  changeTrip(e:any){
    this.idtrip = e.target.value;
   this.activetripService.findTimeStartOf1Trip(this.idtrip).then(
     res=>{
      this.timeStart = res;
      this.idtimeStart = this.timeStart[0].id
     },err=>{
      alert("Error: Back-End")
     }
   );
  }
  changeCar(e:any){
    this.idcars = e.target.value;
   // console.log(this.idcars)
  }
  changeTime(e:any){
    this.idtimeStart = e.target.value;
    //console.log(this.idtimeStart)
  }
  changeStatus(e:any){
    this.status = e.target.value;
   // console.log(this.status)
  }

  create(){
    var activetripcreate = new ActiveTripsAPI;
    if(this.idtrip!=0&&this.idcars&& this.idtimeStart!=null){
      activetripcreate.Idtrips =  this.idtrip;
      activetripcreate.Idcars =  this.idcars;
      activetripcreate.IdtimeStart =   this.idtimeStart;
      activetripcreate.Status =  this.status;
      this.activetripService.create(activetripcreate).then(res=>{
        if(res==true){
          alert("Success");
          this.router.navigate(['admin/activetrips']);
        }else{
          alert("Error Back End");
        }
      },err=>{alert("Error")});
    }else{
      alert("Lam on ghi Vooo!!")
    }
   
}


}
