import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveTrips } from 'src/app/model/activetrips.model';
import { ActiveTripsService } from 'src/app/services/activetrips.service';

@Component({
  selector: 'app-activetrips',
  templateUrl: './activetrips.component.html',
})
export class ActivetripsComponent implements OnInit {
  fullnameUser : string;
  activetrips:ActiveTrips[];
  constructor(
    private activetripService : ActiveTripsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.activetripService.findall().then(
      res => {
        this.activetrips = res;
  }, 
  err=>{
   console.log(err);
  },);
  }

  edit(e:any){
    var id = e.target.value;
    console.log(id);
    this.activetripService.update(id).then(
      res=>{
        if(res){
          alert("Success");
          window.location.reload();
        }else{
          alert("Error: Ticket already or Tine Start of trip already or Car is active")
        }
      },err=>{
        alert("Error:"+err)
      }
    );
  }


}
