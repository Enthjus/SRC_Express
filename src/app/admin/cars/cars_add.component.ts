import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars_add.component.html',
})
export class AddCarsComponent implements OnInit {
  registerForm: FormGroup;
  fullnameUser : string;
  constructor(
    private formBuilder: FormBuilder,
    private carAPI: CarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.registerForm = this.formBuilder.group({
      nameCar: ["",Validators.required],
      idType: [1,Validators.required],
      typeName: ["",Validators.required],
      percentType: ["",Validators.required],
      model: ["",Validators.required],
      registrationDateStart: ["",Validators.required],
      registrationDateEnd: ["",Validators.required],
      photo: "http://localhost:57771/uploads/ship.jpg",
    });

  }

  save(){
    var newCar: Car = this.registerForm.value;
    newCar.registrationDateStart = newCar.registrationDateStart + "T00:00:00";
    newCar.registrationDateEnd = newCar.registrationDateEnd + "T00:00:00";
    this.carAPI.findTypeByIDtype(newCar.idType).then(
      res=>{
        var typecar  = JSON.parse(JSON.stringify(res))
        console.log(typecar.nameType);
        newCar.typeName = typecar.nameType;
        newCar.percentType = typecar.PercentType;
        this.carAPI.create(newCar).then(
          res=>{
            if(res !=null){
              alert("Success");
              this.router.navigate(['admin/cars']);
            }else{
              alert("Error");
            }
          },err=>{
            console.log(err)
            alert("Error");
          }
        );
      },err=>{
        console.log(err);
        alert("Error");
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
