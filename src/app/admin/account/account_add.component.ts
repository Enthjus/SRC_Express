import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account_add.component.html',
})
export class AddAccountComponent implements OnInit {
  registerForm: FormGroup;
  kq: boolean;
  err: string = null;
  fullnameUser : string;
  constructor(
    private formBuilder: FormBuilder,
    private accountAPI: AccountService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.registerForm = this.formBuilder.group({
      username: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      password: ["",Validators.required],
      fullName: ["",Validators.required],
      email: ["",[Validators.email,Validators.required]],
      dob: ["",Validators.required],
      photo: "http://localhost:57771/uploads/baal.jpg",
      nameRole: "Customer",
    });
  }


  save() {
    var account: Account = this.registerForm.value;
    account.dob = account.dob + "T00:00:00";
    this.accountAPI.create(account).then(
      res => {
        this.kq = res;
        if (this.kq) {
          this.router.navigate(['admin/account']);
          alert("Success");
          
        } else {
          alert("Your username da co roi !!!")
        }
      },
      err => {
        console.log(err);
      });

  }



}
