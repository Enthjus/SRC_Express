import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from '../model/account.model';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  loginForm: FormGroup;
  constructor(
    private loginAPI: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  login() {

    var user: Account = this.loginForm.value;
    user.fullName = "xxx";
    user.email = "xxxx@gmail.com";
    user.dob = "1997-07-11T00:00:00";
    user.photo = "xxxx";
    user.nameRole = "xxx";

    this.loginAPI.login(user).then(res => {
      var token = res;
      if (token == "Invaid creadentials") {
        this.invalidLogin = true;
        alert("Saiii")
      } else {
        sessionStorage.setItem("jwt",token);
        var decodedToken = this.jwtHelper.decodeToken(token);
        console.log(decodedToken.Fullname);
       // var expirationDate = this.jwtHelper.getTokenExpirationDate(token);
       // var isExpired = this.jwtHelper.isTokenExpired(token);
       sessionStorage.setItem("fullname",decodedToken.Fullname);
       this.router.navigate(['/home']);

        
      }
    },
      err => {
        console.log('Error')
        this.invalidLogin = true;
      });

  }

}
