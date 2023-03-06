import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars_edit.component.html',
})
export class EditCarsComponent implements OnInit {
  car: Car;
  registerForm: FormGroup;
  photo: string;
  file: any=null;
  res: any;
  fullnameUser : string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carAPI: CarService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    var idedit = this.route.snapshot.paramMap.get("id");
    this.carAPI.find(idedit).then(
      res => {
        this.car = res;
        this.photo = this.car.photo;
        this.registerForm = this.formBuilder.group({
          nameCar: [this.car.nameCar,Validators.required],
          idType: [this.car.idType,Validators.required],
          typeName: [this.car.typeName,Validators.required],
          percentType: [this.car.percentType,Validators.required],
          model: [this.car.model,Validators.required],
          registrationDateStart: [this.car.registrationDateStart.replace("T00:00:00",""),Validators.required],
          registrationDateEnd: [this.car.registrationDateEnd.replace("T00:00:00",""),Validators.required],
          photo: this.car.photo,
        });
      },
      err => {
        console.log(err);
      });
  }

  selectFile(e: any) {
    this.file = e.target.files[0];
  }
  
  upload() {
    let formData = new FormData();
    formData.append('file', this.file);
this.carAPI.uploadfile(formData).then(
  res=>{
    this.res = res;
    if(this.res!=null){
      var updateCar:Car = this.registerForm.value;
      updateCar.id = this.car.id;
      updateCar.typeName = this.car.typeName;
      updateCar.percentType = this.car.percentType;
      updateCar.registrationDateStart = updateCar.registrationDateStart + "T00:00:00";
      updateCar.registrationDateEnd = updateCar.registrationDateEnd + "T00:00:00";
      updateCar.photo = this.res;
      this.carAPI.update(updateCar).then(
        res => {
          this.car = res;
         
          alert("Success");
          this.router.navigate(['admin/cars']);
        },
        err => {
          console.log(err);
          alert("Error");
        });

    }
  },err=>{
    console.log(err);
  }
);
  }

save(){
  if(this.file != null){
    this.upload();
  }else{
    var updateCar:Car = this.registerForm.value;
    updateCar.id = this.car.id;
    updateCar.typeName = this.car.typeName;
    updateCar.percentType = this.car.percentType;
    updateCar.registrationDateStart = updateCar.registrationDateStart + "T00:00:00";
    updateCar.registrationDateEnd = updateCar.registrationDateEnd + "T00:00:00";
    updateCar.photo = this.car.photo;
    this.carAPI.update(updateCar).then(
      res => {
        this.car = res;
        if(this.car!=null){
         
          alert("Success");
          this.router.navigate(['admin/cars']);
         
        }else{
          alert("Error");
        }
      
      },
      err => {
        console.log(err);
        alert("Error");
      });
  }
}

}
