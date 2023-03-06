import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PricePerKm } from 'src/app/model/priceperkm.model';
import { PricePerKmService } from 'src/app/services/priceperkm.service';

@Component({
  selector: 'app-price-per-km',
  templateUrl: './price-per-km_edit.component.html',
})
export class EditPricePerKmComponent implements OnInit {

  priceperkm: PricePerKm;
  registerForm: FormGroup;
  photo: string;
  file: any=null;
  res: any;
  fullnameUser : string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private priceperkmService: PricePerKmService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    var idedit = this.route.snapshot.paramMap.get("id") ;
    this.priceperkmService.find(idedit).then(
      res => {
        this.priceperkm = res;
        this.registerForm = this.formBuilder.group({
          price:[this.priceperkm.price,[Validators.required,Validators.min(1),Validators.max(1000000)]],
        });
      },
      err => {
        console.log(err);
      });
  }
save(){
  var updatepriceperkm:PricePerKm = this.registerForm.value;
  updatepriceperkm.id = this.priceperkm.id;

  this.priceperkmService.update(updatepriceperkm).then(
    res => {
      this.priceperkm = res;
     
      alert("Success");
      this.router.navigate(['admin/account/priceperkm']);
    },
    err => {
      console.log(err);
      alert("Error");
    });
}


}
