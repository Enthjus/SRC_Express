import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
})
export class ContactusComponent implements OnInit {
  fullname_user :string = null;
  constructor() { }

  ngOnInit(): void {
    this.fullname_user = sessionStorage.getItem("fullname");
  }
  logout() {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("fullname");
    this.fullname_user = null;
}
}
