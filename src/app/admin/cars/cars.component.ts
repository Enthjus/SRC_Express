import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit {
cars:Car[];
typeName:string;
fullnameUser : string;
  constructor(
    private carService : CarService,
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
    this.carService.findall().then(
      res => {
       this.cars = res;
  }, 
  err=>{
   console.log(err);
  },);
  }

  edit(e:any){
    var id = e.target.value;
    this.router.navigate(['admin/cars/edit',{id:id}])
  }
  delete(e:any){
    var id = e.target.value;
    this.carService.delete(id).then(
      res=>{
        var kq:boolean = res; 
       if(res==true){
         alert("Sussecc");
         window.location.reload();
       }else{
         alert("Error: This car is on duty ")
       }
      },err=>{
       alert("Error: "+err)
      }
    );
  }

}
