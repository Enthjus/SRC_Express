import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Refund } from 'src/app/model/refund.model';
import { RefundService } from 'src/app/services/refund.service';

@Component({
  selector: 'app-trips',
  templateUrl: './refund-edit.component.html',
})
export class EditRefundComponent implements OnInit {
  refund: Refund;
  registerForm: FormGroup;
  photo: string;
  file: any=null;
  res: any;
  fullnameUser : string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private refundService: RefundService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    var idedit = this.route.snapshot.paramMap.get("id") ;
    this.refundService.find(idedit).then(
      res => {
        this.refund = res;
        this.registerForm = this.formBuilder.group({
          dayToStart:[this.refund.dayToStart,[Validators.required,Validators.min(0),Validators.max(30)]],
          refundPercent:[this.refund.refundPercent,[Validators.required,Validators.min(0),Validators.max(100)]],
         
        });
      },
      err => {
        console.log(err);
      });
  }

  save(){
    var updaterefund:Refund = this.registerForm.value;
    updaterefund.id = this.refund.id;
    this.refundService.update(updaterefund).then(
      res => {
        this.refund = res;
       
        alert("Success");
        this.router.navigate(['admin/refund']);
      },
      err => {
        console.log(err);
        alert("Error");
      });
  }

}
