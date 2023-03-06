import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/services/account.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  fullnameUser : string;
  db:any;
  listactivetrip : activeTrip[];
  totalpercent:number;


  
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private accountAPI : AccountService,
  ) { }

  ngOnInit(): void {
    this.totalpercent =0;
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.accountAPI.dashboard().then(res=>{
      this.db = JSON.parse(JSON.stringify(res));
      this.listactivetrip = this.db.activeTrip;
     this.listactivetrip.filter(e=>{
       this.totalpercent +=e.sumTicket;
     });
     
    },err=>{
      console.log(err);
    });
   

  }
  
  getPercent(e:number):string{
    var s = e / this.totalpercent *100;
    return s+"%"
  }


}

export class activeTrip{
  name: string;
  sumTicket: number;
}
