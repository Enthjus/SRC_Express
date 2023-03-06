import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricePerKm } from 'src/app/model/priceperkm.model';
import { PricePerKmService } from 'src/app/services/priceperkm.service';

@Component({
  selector: 'app-price-per-km',
  templateUrl: './price-per-km.component.html',
})
export class PricePerKmComponent implements OnInit {
  priceperkmInfo : PricePerKm;
  fullnameUser : string;
  constructor(
    private priceperkmService : PricePerKmService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.priceperkmService.find("1").then(
      res => {
       this.priceperkmInfo = res;
   
  }, 
  err=>{
   console.log(err);
  },);
  }
  edit(e:any){
    var id = e.target.value;
    this.router.navigate(['admin/account/priceperkm/edit',{id:id}])
  }

}
