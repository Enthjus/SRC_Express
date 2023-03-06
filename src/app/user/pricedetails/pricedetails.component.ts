import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PercentByAge } from 'src/app/model/percentbyage.model';
import { PricePerKm } from 'src/app/model/priceperkm.model';
import { Refund } from 'src/app/model/refund.model';
import { PercentByAgeService } from 'src/app/services/percentbyage.service';
import { PricePerKmService } from 'src/app/services/priceperkm.service';
import { RefundService } from 'src/app/services/refund.service';

@Component({
  selector: 'app-pricedetails',
  templateUrl: './pricedetails.component.html',
})
export class PricedetailsComponent implements OnInit {
  fullname_user: string = null;
  percentbyage: PercentByAge[];
  priceperkmInfo: PricePerKm;
  refunds : Refund[]
  constructor(
    private percentbyageService: PercentByAgeService,
    private priceperkmService: PricePerKmService,
    private refundService : RefundService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fullname_user = sessionStorage.getItem("fullname");
    this.priceperkmService.find("1").then(
      res => {
        this.priceperkmInfo = res;
      },
      err => {
       alert("Error:LoaddingData or Connection")
      });
      this.percentbyageService.findall().then(
        res => {
         this.percentbyage = res;
       
    }, 
    err=>{
      alert("Error:LoaddingData or Connection")
    },);
    this.refundService.findall().then(
      res => {
       this.refunds = res;
  }, 
  err=>{
    alert("Error:LoaddingData or Connection")
  },);
  }
  logout() {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("fullname");
    this.fullname_user = null;
  }
}
