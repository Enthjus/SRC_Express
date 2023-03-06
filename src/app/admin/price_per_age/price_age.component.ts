import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PercentByAge } from 'src/app/model/percentbyage.model';
import { PercentByAgeService } from 'src/app/services/percentbyage.service';

@Component({
  selector: 'app-price',
  templateUrl: './price_age.component.html',
})
export class PriceAgeComponent implements OnInit {
  fullnameUser : string;
  percentbyage : PercentByAge[]
  constructor(
    private percentbyageService : PercentByAgeService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.percentbyageService.findall().then(
      res => {
       this.percentbyage = res;
     
  }, 
  err=>{
   console.log(err);
  },);
  }
  edit(e:any){
    var id = e.target.value;
    this.router.navigate(['admin/account/priceage/edit',{id:id}])
  }


}
