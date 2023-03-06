import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price_age_add.component.html',
})
export class AddPriceAgeComponent implements OnInit {
  fullnameUser : string;
  constructor() { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
  }

}
