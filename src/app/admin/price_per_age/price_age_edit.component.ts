import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PercentByAge } from 'src/app/model/percentbyage.model';
import { PercentByAgeService } from 'src/app/services/percentbyage.service';

@Component({
  selector: 'app-price',
  templateUrl: './price_age_edit.component.html',
})
export class EditPriceAgeComponent implements OnInit {
  percentbyage: PercentByAge;
  registerForm: FormGroup;
  photo: string;
  file: any=null;
  res: any;
  fullnameUser : string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private percentbyageService: PercentByAgeService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    var idedit = this.route.snapshot.paramMap.get("id") ;
    this.percentbyageService.find(idedit).then(
      res => {
        this.percentbyage = res;
        this.registerForm = this.formBuilder.group({
          ageStart:[this.percentbyage.ageStart,[Validators.required,Validators.min(0),Validators.max(200)]],
          ageEnd:[this.percentbyage.ageEnd,[Validators.required,Validators.min(0),Validators.max(200)]],
          percentDiscount:[this.percentbyage.percentDiscount,[Validators.required,,Validators.min(0),Validators.max(100)]],
        });
      },
      err => {
        console.log(err);
      });
  }
  save(){
    var updatepercentbyage:PercentByAge = this.registerForm.value;
    updatepercentbyage.id = this.percentbyage.id;
    this.percentbyageService.update(updatepercentbyage).then(
      res => {
        this.percentbyage = res;
       
        alert("Success");
        this.router.navigate(['admin/account/priceage']);
      },
      err => {
        console.log(err);
        alert("Error");
      });
  }

}
