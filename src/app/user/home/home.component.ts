import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
   fullname_user :string = null;
  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.fullname_user = sessionStorage.getItem("fullname");
  }
 
  logout() {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("fullname");
    this.fullname_user = null;
}

}
