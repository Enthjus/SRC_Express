import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/app/model/trip.model';
import { TripService } from 'src/app/services/trip.service';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-trips',
  templateUrl: './trips_add.component.html',
})
export class AddTripsComponent implements OnInit {
  registerForm: FormGroup;
  fullnameUser : string;

 

  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.registerForm = this.formBuilder.group({
      nameTrip: ["",[Validators.required]],
      fromAddress:["",[Validators.required]],
      toAddress:["",[Validators.required]],
      photo:"http://localhost:57771/uploads/Inazuma_City.png", 
      distance:["",[Validators.required,Validators.min(1),Validators.max(7000)]],
    });

  
    
  }
  save(){
    var newTrip: Trip = this.registerForm.value;
    this.tripService.create(newTrip).then(
      res=>{
        console.log(res);
        alert("Success");
        this.router.navigate(['admin/trips']);
      },err=>{
        console.log(err)
      }
    );
   /* console.log(newCar.id);
    console.log(newCar.nameCar);
    console.log(newCar.idType);
    console.log(newCar.typeName);
    console.log(newCar.percentType);
    console.log(newCar.model);
    console.log(newCar.registrationDateStart);
    console.log(newCar.registrationDateEnd);
    console.log(newCar.photo);*/
  }

}
