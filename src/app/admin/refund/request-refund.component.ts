import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestRefund } from 'src/app/model/requestrefund.model';
import { RefundService } from 'src/app/services/refund.service';

@Component({
  selector: 'app-request-refund',
  templateUrl: './request-refund.component.html',
})
export class RequestRefundComponent implements OnInit {
  fullnameUser : string;
  requestrefunds : RequestRefund[];
  constructor(
    private refundService : RefundService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.refundService.findallRequestRefund().then(res=>{
      this.requestrefunds = res;
    },err=>{
      alert("Error: loadding data or connection")
    });
  }

  refund(e:any){
    var id = e.target.value;
    this.refundService.UpdateStatusRequestRefund(id).then(res=>{
      if(res){
        alert("Success");
        window.location.reload();
      }else{
        alert("Error:loadData or Connection");
      }
    },err=>{
      alert("Error:loadData or Connection");
    });
  }

}
