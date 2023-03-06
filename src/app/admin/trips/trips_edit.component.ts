import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/model/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips_edit.component.html',
})
export class EditTripsComponent implements OnInit {
  trip: Trip;
  registerForm: FormGroup;
  photo: string;
  file: any=null;
  res: any;
  fullnameUser : string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    var idedit =this.route.snapshot.paramMap.get("id") ;
    this.tripService.find(idedit).then(
      res => {
        this.trip = res;
        this.photo = this.trip.photo;
        this.registerForm = this.formBuilder.group({
          nameTrip: [this.trip.nameTrip,Validators.required],
          fromAddress:[this.trip.fromAddress,Validators.required],
          toAddress:[this.trip.toAddress,Validators.required],
          photo:this.trip.id,
          distance:[this.trip.distance,[Validators.required,Validators.min(1),Validators.max(7000)]],
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
this.tripService.uploadfile(formData).then(
  res=>{
    this.res = res;
    if(this.res!=null){
      var updateTrip:Trip = this.registerForm.value;
      updateTrip.id = this.trip.id;
      updateTrip.photo = this.res;
      this.tripService.update(updateTrip).then(
        res => {
          this.trip = res;
         
          alert("Success");
          this.router.navigate(['admin/trips']);
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
      var updateTrip:Trip = this.registerForm.value;
      updateTrip.id = this.trip.id;
      updateTrip.photo = this.trip.photo;
      this.tripService.update(updateTrip).then(
        res => {
          this.trip = res;
         
          alert("Success");
          this.router.navigate(['admin/trips']);
        },
        err => {
          console.log(err);
          alert("Error");
        });
    }
  }


}
