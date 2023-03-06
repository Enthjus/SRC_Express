import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets_edit.component.html',
})
export class EditTicketsComponent implements OnInit {
  fullnameUser : string;
  constructor() { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
  }

}
