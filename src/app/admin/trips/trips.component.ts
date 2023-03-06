import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'src/app/model/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
})
export class TripsComponent implements OnInit {
  trips:Trip[];
  fullnameUser : string;
  constructor(
    private tripService : TripService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.tripService.findall().then(
      res => {
       this.trips = res;
  }, 
  err=>{
   console.log(err);
  },);
  }
  edit(e:any){
    var id = e.target.value;
    this.router.navigate(['admin/trips/edit',{id:id}])
  }
  delete(e:any){
    var id = e.target.value;
    this.tripService.delete(id).then(
      res=>{
        var kq:boolean = res; 
       if(res==true){
         alert("Sussecc");
         window.location.reload();
       }else{
         alert("Error")
       }
      },err=>{
       alert("Error: "+err)
      }
    );
  }


}
