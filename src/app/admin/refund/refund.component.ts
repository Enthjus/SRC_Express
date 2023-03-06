import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Refund } from 'src/app/model/refund.model';
import { RefundService } from 'src/app/services/refund.service';

@Component({
  selector: 'app-request-refund',
  templateUrl: './refund.component.html',
})
export class RefundComponent implements OnInit {
  fullnameUser : string;
  refunds : Refund[]
  constructor(
    private refundService : RefundService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.refundService.findall().then(
      res => {
       this.refunds = res;
     
  }, 
  err=>{
   console.log(err);
  },);
  }
  edit(e:any){
    var id = e.target.value;
    this.router.navigate(['admin/refund/edit',{id:id}])
  }

}
