import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account_edit.component.html',
})
export class EditAccountComponent implements OnInit {
  account: Account;
  registerForm: FormGroup;
  photo: string;
  fullnameUser : string;
  file: any=null;
  res: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountAPI: AccountService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.fullnameUser = sessionStorage.getItem("fullname");
    var idedit = this.route.snapshot.paramMap.get("id");
    this.accountAPI.find(idedit).then(
      res => {
        this.account = res;
        this.photo = this.account.photo;
        this.registerForm = this.formBuilder.group({
          username: [this.account.username, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
          password: ["", Validators.required],
          fullName: [this.account.fullName, Validators.required],
          email: [this.account.email, [Validators.email, Validators.required]],
          dob: [this.account.dob.replace("T00:00:00",""), Validators.required],
          photo: this.account.photo,
          nameRole: this.account.nameRole,
        });
      },
      err => {
        console.log(err);
      });
  }

  selectFile(e: any) {
    this.file = e.target.files[0];
  }
  upload() {
    let formData = new FormData();
    formData.append('file', this.file);
this.accountAPI.uploadfile(formData).then(
  res=>{
    this.res = res;
    if(this.res!=null){
      var updateAcc:Account = this.registerForm.value;
      updateAcc.id = this.account.id;
      updateAcc.dob = updateAcc.dob + "T00:00:00";
      updateAcc.photo = this.res;
      this.accountAPI.update(updateAcc).then(
        res => {
          this.account = res;
          alert("Success");
          this.router.navigate(['/admin/account']);
        },
        err => {
          console.log(err);
          alert("Error");
        });

    }
  },err=>{
    console.log(err);
    alert("Error");
  }
);
  }

  save() {
    if(this.file != null){
      this.upload();
     
    }else{
      var updateAcc:Account = this.registerForm.value;
      updateAcc.id = this.account.id;
      updateAcc.dob = updateAcc.dob + "T00:00:00";
      updateAcc.photo = this.account.photo;
      this.accountAPI.update(updateAcc).then(
        res => {
          this.account = res;
          
          if(this.account!=null){
            alert("Success");
            this.router.navigate(['admin/account']);
          }else{
            alert("Error");
          }
         
        },
        err => {
          console.log(err);
          alert("Error");
        });
    }
  }

}
